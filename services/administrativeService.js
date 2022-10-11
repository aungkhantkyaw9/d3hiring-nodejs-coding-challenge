"use strict";

const sequelize = require("../database/connection");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const TeacherStudent = require("../models/TeacherStudent");
const emailHelper = require("../helper/emailHelper");

/**
 * Register students by given teacher email
 * @param teacherEmail teacher email
 * @param studentEmail student email array
 */
exports.register = async (teacherEmail, studentEmail) => {
    if (teacherEmail === null) {
        return { status: 400, message: "Teacher email is required." };
    } else if (!emailHelper.validateEmail(teacherEmail)) {
        return { status: 400, message: "Invalid teacher email." };
    }

    if (studentEmail === null || typeof (studentEmail) != "object" || studentEmail.length === 0) {
        return { status: 400, message: "Student email is required." };
    } else {
        for(let i = 0; i < studentEmail.length; i++) {
            if (!emailHelper.validateEmail(studentEmail[i])) {
                return { status: 400, message: "Invalid student email." };
            }
        }
    }

    try {
        const teacher = await Teacher.findOne({
            where: {
                email: teacherEmail
            },
        });

        let teacherResult;

        if (teacher === null) {
            teacherResult = await Teacher.create({ email: teacherEmail });
        }

        for (let i = 0; i < studentEmail.length; i++) {
            const student = await Student.findOne({
                where: {
                    email: studentEmail[i]
                },
            });

            let studentResult;

            if (student === null) {
                studentResult = await Student.create({ email: studentEmail[i] });

            }

            if (teacher === null) {
                if (student === null) {
                    await TeacherStudent.create({ teacher_id: teacherResult.teacher_id, student_id: studentResult.student_id });
                } else {
                    await TeacherStudent.create({ teacher_id: teacherResult.teacher_id, student_id: student.student_id });
                }
            } else {
                if (student === null) {
                    await TeacherStudent.create({ teacher_id: teacher.teacher_id, student_id: studentResult.student_id });
                } else {
                    await TeacherStudent.create({ teacher_id: teacher.teacher_id, student_id: student.student_id });
                }
            }
        }

        return { status: 204, message: "Successfully registered" };
    } catch (error) {
        return { status: 500, message: "Error in database" };
    }
};

/**
 * Get common students list by given teachers list
 * @param teacherEmail teacher email list or single teacher email
 * @returns students list by given teachers list
 */
exports.commonStudents = async (teacherEmail) => {
    if (teacherEmail === null) {
        return { status: 400, message: "Teacher email is required." };
    } else if ((typeof teacherEmail) === "string") {
        if (!emailHelper.validateEmail(teacherEmail)) {
            return { status: 400, message: "Invalid teacher email." };
        }
    } else if ((typeof teacherEmail) === "object") {
        for(let i = 0; i < teacherEmail.length; i++) {
            if (!emailHelper.validateEmail(teacherEmail[i])) {
                return { status: 400, message: "Invalid teacher email." };
            }
        }
    }

    try {
        let queryBuilder = "", replace = [];
        if ((typeof teacherEmail) === "string") {
            queryBuilder = "SELECT s.`email` FROM `university`.`student` s \
                            LEFT JOIN `university`.`teacher_student` ts \
                            ON s.`student_id`= ts.`student_id` \
                            LEFT JOIN `university`.`teacher` t \
                            ON ts.`teacher_id` = t.`teacher_id` \
                            WHERE t.`email` = ?";

            replace = [teacherEmail];
        } else if ((typeof teacherEmail) === "object") {
            let whereClause = " WHERE ";

            queryBuilder = "SELECT * FROM (";

            for (let i = 0; i < teacherEmail.length; i++) {
                queryBuilder += `(SELECT s.email FROM university.student s \
                                LEFT JOIN university.teacher_student ts \
                                ON s.student_id= ts.student_id \
                                LEFT JOIN university.teacher t \
                                ON ts.teacher_id = t.teacher_id \
                                WHERE t.email = ?) AS res_${i}${i !== teacherEmail.length - 1 ? "," : ")"}`;

                if ((i + 1) !== teacherEmail.length) {
                    whereClause += `res_${i}.email = res_${i + 1}.email ${i + 1 !== teacherEmail.length - 1 ? "AND " : ";"}`;
                }

            }
            queryBuilder += whereClause;

            replace = teacherEmail;
        }
        
        const studentList = await sequelize.query(queryBuilder,
            {
                replacements: replace,
                type: sequelize.QueryTypes.SELECT,
            }
        );

        const students = [];

        studentList.forEach(student => {
            students.push(student.email)
        });

        return { status: 200, students: students };
    } catch (error) {
        return { status: 500, message: "Error in database" };
    }
};

/**
 * Suspend specified student
 * @param studentEmail student email to specify
 */
exports.suspend = async (studentEmail) => {
    if (studentEmail === null) {
        return { status: 400, message: "Student email is required." };
    } else if (!emailHelper.validateEmail(studentEmail)) {
        return { status: 400, message: "Invalid student email." };
    }

    try {
        await Student.update(
            { is_suspended: 1 },
            { where: { email: studentEmail } }
        )

        return { status: 204, message: "Successfully suspended" };
    } catch (error) {
        return { status: 500, message: "Error in database" };
    }
};

/**
 * Get student list for notification sending by given teacher and mention
 * in notification text and not suspended
 * @param teacherEmail notification sender
 * @param notification notification text
 * @returns student list by mention or registered to given teacher
 */
exports.retrieveForNotifications = async (teacherEmail, notification) => {
    if (teacherEmail === null) {
        return { status: 400, message: "Teacher email is required." };
    } else if (!emailHelper.validateEmail(teacherEmail)) {
        return { status: 400, message: "Invalid teacher email." };
    }

    if (notification === null) {
        return { status: 400, message: "Notification message is required." };
    } else if ((typeof notification) !== "string") {
        return { status: 400, message: "Invalid notification string." };
    }

    try {
        const emailArray = emailHelper.extractEmail(notification);

        let queryBuilder = "", replace = [];

        if (emailArray.length === 0) {
            queryBuilder = "SELECT s.`email` FROM `university`.`student` s \
                            LEFT JOIN`university`.`teacher_student` ts \
                            ON ts.`student_id` = s.`student_id` \
                            LEFT JOIN`university`.`teacher` t \
                            ON t.`teacher_id` = ts.`teacher_id` \
                            WHERE t.`email` = ? \
                            AND`is_suspended` = 0";

            replace = [teacherEmail]
        } else {
            queryBuilder = "(SELECT `email` FROM `university`.`student` WHERE `email` IN ( ? ) AND `is_suspended` = 0) \
                            UNION \
                            (SELECT s.`email` FROM `university`.`student` s \
                            LEFT JOIN`university`.`teacher_student` ts \
                            ON ts.`student_id` = s.`student_id` \
                            LEFT JOIN`university`.`teacher` t \
                            ON t.`teacher_id` = ts.`teacher_id` \
                            WHERE t.`email` = ? \
                            AND`is_suspended` = 0); ";

            replace = [emailArray, teacherEmail]
        }

        const studentList = await sequelize.query(queryBuilder,
            {
                replacements: replace,
                type: sequelize.QueryTypes.SELECT,
            }
        );

        const recipent = [];

        studentList.forEach(student => {
            recipent.push(student.email)
        });

        return { status: 200, recipent: recipent };
    } catch (error) {
        return { status: 500, message: "Error in database" };
    }
};
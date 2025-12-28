import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './src/models/User.js';
import Student from './src/models/Student.js';
import Class from './src/models/Class.js';
import Attendance from './src/models/Attendance.js';
import Fee from './src/models/Fee.js';
import Homework from './src/models/Homework.js';
import Result from './src/models/Result.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Student.deleteMany({});
        await Class.deleteMany({});
        await Attendance.deleteMany({});
        await Fee.deleteMany({});
        await Homework.deleteMany({});
        await Result.deleteMany({});

        // Create Users
        console.log('👥 Creating users...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@school.com',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '1234567890'
        });

        const teacher1 = await User.create({
            name: 'John Smith',
            email: 'john.smith@school.com',
            password: hashedPassword,
            role: 'TEACHER',
            phone: '1234567891'
        });

        const teacher2 = await User.create({
            name: 'Sarah Johnson',
            email: 'sarah.johnson@school.com',
            password: hashedPassword,
            role: 'TEACHER',
            phone: '1234567892'
        });

        // Create Parents
        const parent1 = await User.create({
            name: 'Mary Williams',
            email: 'mary.williams@school.com',
            password: hashedPassword,
            role: 'PARENT',
            phone: '1234567893'
        });

        const parent2 = await User.create({
            name: 'David Brown',
            email: 'david.brown@school.com',
            password: hashedPassword,
            role: 'PARENT',
            phone: '1234567896'
        });

        const parent3 = await User.create({
            name: 'Lisa Anderson',
            email: 'lisa.anderson@school.com',
            password: hashedPassword,
            role: 'PARENT',
            phone: '1234567897'
        });

        const parent4 = await User.create({
            name: 'Robert Taylor',
            email: 'robert.taylor@school.com',
            password: hashedPassword,
            role: 'PARENT',
            phone: '1234567898'
        });

        const parent5 = await User.create({
            name: 'Jennifer Martinez',
            email: 'jennifer.martinez@school.com',
            password: hashedPassword,
            role: 'PARENT',
            phone: '1234567899'
        });

        // Create Classes first (before students reference them)
        console.log('📚 Creating classes...');
        const class10A = await Class.create({
            name: 'Class 10-A',
            section: 'A',
            grade: '10',
            classTeacher: teacher1._id,
            subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
            academicYear: '2024-2025'
        });

        const class8B = await Class.create({
            name: 'Class 8-B',
            section: 'B',
            grade: '8',
            classTeacher: teacher2._id,
            subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
            academicYear: '2024-2025'
        });

        // Create 10 Students
        console.log('👨‍🎓 Creating 10 students...');
        const students = [
            { name: 'Sarah Williams', email: 'sarah.w@school.com', phone: '9876543210', parent: parent1._id, class: class10A._id, rollNo: '101' },
            { name: 'Michael Williams', email: 'michael.w@school.com', phone: '9876543211', parent: parent1._id, class: class8B._id, rollNo: '201' },
            { name: 'Emma Brown', email: 'emma.brown@school.com', phone: '9876543212', parent: parent2._id, class: class10A._id, rollNo: '102' },
            { name: 'James Brown', email: 'james.brown@school.com', phone: '9876543213', parent: parent2._id, class: class8B._id, rollNo: '202' },
            { name: 'Olivia Anderson', email: 'olivia.anderson@school.com', phone: '9876543214', parent: parent3._id, class: class10A._id, rollNo: '103' },
            { name: 'Noah Anderson', email: 'noah.anderson@school.com', phone: '9876543215', parent: parent3._id, class: class8B._id, rollNo: '203' },
            { name: 'Sophia Taylor', email: 'sophia.taylor@school.com', phone: '9876543216', parent: parent4._id, class: class10A._id, rollNo: '104' },
            { name: 'Liam Taylor', email: 'liam.taylor@school.com', phone: '9876543217', parent: parent4._id, class: class8B._id, rollNo: '204' },
            { name: 'Ava Martinez', email: 'ava.martinez@school.com', phone: '9876543218', parent: parent5._id, class: class10A._id, rollNo: '105' },
            { name: 'Ethan Martinez', email: 'ethan.martinez@school.com', phone: '9876543219', parent: parent5._id, class: class8B._id, rollNo: '205' }
        ];

        const studentDocs = [];
        for (const studentData of students) {
            // Create user account
            const studentUser = await User.create({
                name: studentData.name,
                email: studentData.email,
                password: hashedPassword,
                role: 'STUDENT',
                phone: studentData.phone
            });

            // Create student document
            const studentDoc = await Student.create({
                userId: studentUser._id,
                rollNo: studentData.rollNo,
                classId: studentData.class,
                parentId: studentData.parent
            });

            studentDocs.push({ ...studentDoc.toObject(), userId: studentUser._id, classId: studentData.class });
        }

        // Create Attendance Records for all 10 students
        console.log('📅 Creating attendance records...');
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0); // Reset time to midnight
            
            // Skip Sundays
            if (date.getDay() === 0) continue;

            for (const studentDoc of studentDocs) {
                const random = Math.random();
                let status = 'PRESENT';
                if (random < 0.05) status = 'ABSENT';
                else if (random < 0.10) status = 'LATE';

                await Attendance.create({
                    studentId: studentDoc._id,
                    date,
                    status,
                    remarks: status === 'ABSENT' ? 'Medical leave' : ''
                });
            }
        }

        // Create Fee Records for all 10 students
        console.log('💰 Creating fee records...');
        for (let i = 0; i < studentDocs.length; i++) {
            const studentDoc = studentDocs[i];
            const isPaid = i % 3 !== 2; // 2 out of 3 students have paid
            
            // Term 1 fees
            await Fee.create({
                studentId: studentDoc._id,
                amount: 25000,
                dueDate: new Date('2024-09-15'),
                paidDate: isPaid ? new Date('2024-09-10') : null,
                status: isPaid ? 'PAID' : 'PENDING',
                description: 'Tuition Fee - Term 1'
            });

            // Term 2 fees (upcoming)
            const hasPaidTerm2 = i % 4 === 0; // Only 25% paid term 2
            await Fee.create({
                studentId: studentDoc._id,
                amount: 25000,
                dueDate: new Date('2025-01-15'),
                paidDate: hasPaidTerm2 ? new Date('2025-01-10') : null,
                status: hasPaidTerm2 ? 'PAID' : 'PENDING',
                description: 'Tuition Fee - Term 2'
            });
        }

        // Create Homework
        console.log('📝 Creating homework assignments...');
        await Homework.create({
            title: 'Chapter 5: Quadratic Equations',
            description: 'Solve all questions from Exercise 5.1, 5.2, and 5.3',
            classId: class10A._id,
            subject: 'Mathematics',
            assignedBy: teacher1._id,
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            assignedDate: new Date(),
            status: 'Active'
        });

        await Homework.create({
            title: 'Lab Report: Chemical Reactions',
            description: 'Write a detailed lab report on acids and bases experiment',
            classId: class8B._id,
            subject: 'Science',
            assignedBy: teacher2._id,
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            assignedDate: new Date(),
            status: 'Active'
        });

        // Create Results for all 10 students
        console.log('🎯 Creating exam results...');
        const subjects10 = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];
        const subjects8 = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'];

        for (const studentDoc of studentDocs) {
            const isClass10 = studentDoc.classId.equals(class10A._id);
            const subjects = isClass10 ? subjects10 : subjects8;
            
            const resultSubjects = subjects.map(subject => {
                const baseMarks = isClass10 ? 75 : 65;
                const marks = Math.floor(baseMarks + Math.random() * 25);
                return {
                    subjectName: subject,
                    marksObtained: marks,
                    totalMarks: 100,
                    grade: marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B+' : marks >= 60 ? 'B' : 'C'
                };
            });

            const totalMarks = resultSubjects.reduce((sum, s) => sum + s.marksObtained, 0);
            const maxMarks = resultSubjects.length * 100;

            await Result.create({
                studentId: studentDoc._id,
                classId: studentDoc.classId,
                examType: 'Midterm',
                academicYear: '2024-2025',
                subjects: resultSubjects,
                totalMarksObtained: totalMarks,
                maxMarks: maxMarks,
                percentage: (totalMarks / maxMarks * 100).toFixed(2)
            });
        }

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - ${await User.countDocuments()} users`);
        console.log(`   - ${await Student.countDocuments()} students`);
        console.log(`   - ${await Class.countDocuments()} classes`);
        console.log(`   - ${await Attendance.countDocuments()} attendance records`);
        console.log(`   - ${await Fee.countDocuments()} fee records`);
        console.log(`   - ${await Homework.countDocuments()} homework assignments`);
        console.log(`   - ${await Result.countDocuments()} exam results`);
        console.log('\n🔐 Login Credentials:');
        console.log('   Admin: admin@school.com / password123');
        console.log('   Teacher: john.smith@school.com / password123');
        console.log('   Parent: mary.williams@school.com / password123');
        console.log('   Student: sarah.w@school.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();

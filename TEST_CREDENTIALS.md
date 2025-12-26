# 🔐 Test Account Credentials

## All Test Accounts Created Successfully! ✅

You now have **4 complete test accounts** - one for each role in the system.

---

## 📋 Complete Credentials List

### 1️⃣ Admin Account
```
Email:    admin@school.com
Password: admin123
Role:     ADMIN
Name:     Admin User
```
**Dashboard:** http://localhost:3000/dashboard/admin

**Features:**
- View all students and teachers
- Manage classes and subjects
- Track attendance and fees
- Generate reports
- System settings

---

### 2️⃣ Teacher Account
```
Email:    teacher@school.com
Password: teacher123
Role:     TEACHER
Name:     John Teacher
Phone:    +1234567890
```
**Dashboard:** http://localhost:3000/dashboard/teacher

**Features:**
- View assigned classes
- Mark attendance
- Assign homework
- Enter exam results
- View student performance

---

### 3️⃣ Student Account
```
Email:    student@school.com
Password: student123
Role:     STUDENT
Name:     Sarah Student
Phone:    +1234567891
```
**Dashboard:** http://localhost:3000/dashboard/student

**Features:**
- View attendance record
- Check homework assignments
- View exam results
- Check fee status
- Academic progress tracking

---

### 4️⃣ Parent Account
```
Email:    parent@school.com
Password: parent123
Role:     PARENT
Name:     Mary Parent
Phone:    +1234567892
```
**Dashboard:** http://localhost:3000/dashboard/parent

**Features:**
- Monitor children's attendance
- View academic performance
- Track fee payments
- Receive notifications
- View homework and results

---

## 🧪 How to Test Each Account

### Method 1: Using the Website (Recommended)

1. **Open:** http://localhost:3000
2. **Click:** The login button for the role you want to test
   - "Admin Login" (Blue)
   - "Teacher Login" (Purple)
   - "Student Login" (Green)
   - "Parent Login" (Yellow)
3. **Enter credentials** from the list above
4. **Click:** "Sign In"
5. **Explore** the role-specific dashboard!

### Method 2: Using PowerShell (API Testing)

**Test Admin Login:**
```powershell
$body = @{
    email = "admin@school.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Test Teacher Login:**
```powershell
$body = @{
    email = "teacher@school.com"
    password = "teacher123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Test Student Login:**
```powershell
$body = @{
    email = "student@school.com"
    password = "student123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Test Parent Login:**
```powershell
$body = @{
    email = "parent@school.com"
    password = "parent123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

---

## 📊 Database Verification

You can view all these users in **MongoDB Compass**:

1. Open MongoDB Compass
2. Connect to your cluster
3. Navigate to: `school_management` → `users`
4. You should see **4 users** with different roles

---

## 🎨 Dashboard Color Themes

Each role has its own color theme:

| Role | Color | Hex Code | Visual |
|------|-------|----------|--------|
| Admin | Blue | #2563eb | 🔵 |
| Teacher | Purple | #9333ea | 🟣 |
| Student | Green | #16a34a | 🟢 |
| Parent | Yellow | #ca8a04 | 🟡 |

---

## 🔄 Quick Switch Between Accounts

To test different roles quickly:

1. **Logout** from current account (click logout button in dashboard)
2. **Return to home** (http://localhost:3000)
3. **Click** different role login button
4. **Login** with that role's credentials

---

## 🎯 What Each Dashboard Shows

### Admin Dashboard
- Total students, teachers, attendance, pending fees
- Recent activities
- Quick actions (Add student, Add teacher, Mark attendance, Manage fees)
- System status

### Teacher Dashboard
- My classes, total students, today's classes, pending homework
- Today's class schedule with status
- Quick actions (Mark attendance, Assign homework, Enter results)

### Student Dashboard
- Attendance %, Average grade, Pending homework, Fee status
- Upcoming homework list
- Recent exam results
- Attendance overview chart

### Parent Dashboard
- Children overview cards with individual stats
- Recent notifications (attendance, fees, results, homework)
- Quick actions (Pay fees, View attendance, View results)

---

## 💡 Pro Tips

1. **Try all dashboards** to see the different perspectives
2. **Check the sidebar** - each role has different navigation items
3. **Notice the colors** - they change based on the role
4. **Test logout** - it clears tokens and redirects to home
5. **Try wrong password** - see the error handling in action

---

## 🔒 Security Features

All accounts have:
- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Automatic logout on token expiry
- ✅ Secure token storage (localStorage)

---

## 📝 Quick Reference Card

**Print this or keep it handy:**

```
┌─────────────────────────────────────────────┐
│     SCHOOL MANAGEMENT SYSTEM - TEST ACCOUNTS │
├─────────────────────────────────────────────┤
│ ADMIN                                        │
│ Email: admin@school.com                      │
│ Pass:  admin123                              │
├─────────────────────────────────────────────┤
│ TEACHER                                      │
│ Email: teacher@school.com                    │
│ Pass:  teacher123                            │
├─────────────────────────────────────────────┤
│ STUDENT                                      │
│ Email: student@school.com                    │
│ Pass:  student123                            │
├─────────────────────────────────────────────┤
│ PARENT                                       │
│ Email: parent@school.com                     │
│ Pass:  parent123                             │
└─────────────────────────────────────────────┘
```

---

## 🎉 You're All Set!

You now have complete access to test all features of the School Management System!

**Start exploring:** http://localhost:3000

**Questions or need more features?** Just ask! 🚀

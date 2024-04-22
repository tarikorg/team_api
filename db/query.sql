    

    SELECT 
    students.id AS student_id,
    CONCAT(students.first_name, ' ', students.last_name) AS full_name,
    course_id,
    name,
    type
    FROM students
    JOIN courses
    ON students.course_id = courses.id
    WHERE course_id 1;

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const employeeSeeds = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      skills: [
        {
          name: "NodeJS",
          experience: 3,
          seniority: "Mid-level",
        },
        {
          name: "ReactJS",
          experience: 2,
          seniority: "Junior",
        },
        {
          name: "Python",
          experience: 1,
          seniority: "Beginner",
        },
      ],
      positions: ["Software Engineer", "Data Analyst"],
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      skills: [
        {
          name: "Java",
          experience: 5,
          seniority: "Senior",
        },
        {
          name: "Spring Boot",
          experience: 4,
          seniority: "Experienced",
        },
        {
          name: "SQL",
          experience: 2,
          seniority: "Intermediate",
        },
      ],
      positions: ["Software Architect", "Database Administrator"],
    },
    {
      name: "Mike Lee",
      email: "mike.lee@example.com",
      skills: [
        {
          name: "C++",
          experience: 7,
          seniority: "Expert",
        },
        {
          name: "Linux",
          experience: 5,
          seniority: "Advanced",
        },
        {
          name: "Git",
          experience: 3,
          seniority: "Proficient",
        },
      ],
      positions: ["DevOps Engineer", "System Administrator"],
    },
  ];
   
  for (const employee of employeeSeeds) {
    console.log(">>>>>>>")
    console.log(employee.positions)

    await prisma.employee.create({
      data: {
        name: employee.name,
        email: employee.email,
        positions: {
          create: employee.positions.map((position) => ({ name: position }))
        },
        skills: {
          create: employee.skills.map((skill) => (skill))
        }
      },
      include: {
        positions: true,
        skills: true
      },
    });
  }
  console.log('Database seeded successfully!');
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
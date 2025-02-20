import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateRandomDate() {
  const minYear = 2020;
  const maxYear = 2024;
  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

  const month = Math.floor(Math.random() * 12) + 1; // Months are 1-indexed
  const day = Math.floor(Math.random() * 30) + 1;

  return new Date(year, month - 1, day).toISOString(); // Convert to ISO format
}

async function seed() {
  const employeeSeeds = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      skills: [
        {name: "NodeJS", experience: '3', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Ruby", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      skills: [
        {name: "Python", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "DevOps"},
        {name: "QA"}
      ]
    },
    {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      skills: [
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "QA"}
      ]
    },
    {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      skills: [
        {name: "Ruby", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "Fullstack Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "David Williams",
      email: "david.williams@example.com",
      skills: [
        {name: "Golang", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "QA"}
      ]
    },
    {
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      skills: [
        {name: "Python", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Ruby", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "DevOps"},
        {name: "Backend Developer"}
      ]
    },
    {
      name: "James Wilson",
      email: "james.wilson@example.com",
      skills: [
        {name: "Rust", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Fullstack Developer"},
        {name: "DevOps"},
        {name: "QA"}
      ]
    },
    {
      name: "Patricia Taylor",
      email: "patricia.taylor@example.com",
      skills: [
        {name: "Golang", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Ruby", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Frontend Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Robert Moore",
      email: "robert.moore@example.com",
      skills: [
        {name: "Python", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "QA"}
      ]
    },
    {
      name: "Linda Anderson",
      email: "linda.anderson@example.com",
      skills: [
        {name: "Ruby", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "Fullstack Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Thomas Jackson",
      email: "thomas.jackson@example.com",
      skills: [
        {name: "NodeJS", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "DevOps"},
        {name: "QA"}
      ]
    },
    {
      name: "Barbara Harris",
      email: "barbara.harris@example.com",
      skills: [
        {name: "Ruby", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "Fullstack Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Daniel Martin",
      email: "daniel.martin@example.com",
      skills: [
        {name: "Rust", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "DevOps"},
        {name: "QA"}
      ]
    },
    {
      name: "Susan Lee",
      email: "susan.lee@example.com",
      skills: [
        {name: "Python", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Ruby", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Frontend Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Paul Walker",
      email: "paul.walker@example.com",
      skills: [
        {name: "Golang", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "QA"}
      ]
    },
    {
      name: "Karen White",
      email: "karen.white@example.com",
      skills: [
        {name: "Rust", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Ruby", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Frontend Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Mark Hall",
      email: "mark.hall@example.com",
      skills: [
        {name: "NodeJS", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Python", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "QA"}
      ]
    },
    {
      name: "Nancy Allen",
      email: "nancy.allen@example.com",
      skills: [
        {name: "Ruby", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "DevOps"},
        {name: "QA"}
      ]
    },
    {
      name: "Steven Young",
      email: "steven.young@example.com",
      skills: [
        {name: "Python", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Rust", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "Golang", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Backend Developer"},
        {name: "Fullstack Developer"},
        {name: "DevOps"}
      ]
    },
    {
      name: "Donna King",
      email: "donna.king@example.com",
      skills: [
        {name: "Golang", experience: '3', seniority: "Mid", lastWorkedAt: generateRandomDate()},
        {name: "Ruby", experience: '5', seniority: "Senior", lastWorkedAt: generateRandomDate()},
        {name: "NodeJS", experience: '1', seniority: "Junior", lastWorkedAt: generateRandomDate()}
      ],
      positions: [
        {name: "Frontend Developer"},
        {name: "Backend Developer"},
        {name: "QA"}
      ]
    }
  ]

  for (const employee of employeeSeeds) {
    await prisma.employee.create({
      data: {
        name: employee.name,
        email: employee.email,
        positions: {
          create: employee.positions.map((position) => (position))
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
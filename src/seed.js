import { Job, Sheet, User } from "./models/modelSync.js";
import { faker } from "@faker-js/faker";

// Generate fake datas
const seed = async () => {

    // Remove all datas
    Job.destroy({ where: {} });
    Sheet.destroy({ where: {} });
    User.destroy({ where: {} });
    console.log(User.findAll());

    // Generate user
    const user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@exemple.com',
        password: 'password'
    });

    // Generate seeds
    const sheet = await Sheet.create({
        name: "stage 2026 IMTS",
        userId: user.id
    });

    // Generate some rows
    const jobs = await Promise.all(
        Array.from({ length: 16 }).map(() => {
            let rand = faker.number.int({ min: 0, max: 3 });

            let status;
            switch (rand) {
                case 0:
                    status = 'application sent';
                    break;
                case 1:
                    status = 'first interview';
                    break;
                case 2:
                    status = 'refused';
                    break;
                case 3:
                    status = 'no response';
                    break;

                default:
                    break;
            }

            return Job.create({
                job: faker.person.jobTitle(),
                companyName: faker.company.buzzNoun(),
                place: faker.location.city(),
                status,
                source: faker.internet.domainName(),
                contact: faker.internet.email(),
                dispatchDate: faker.date.future({ years: 1 }),
                note: faker.hacker.phrase(),
                opinion: faker.number.int({ min: 0, max: 5 }),
                sheetId: sheet.id
            })
        })
    )



}

seed();


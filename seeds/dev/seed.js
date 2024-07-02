// NPM Modules
import knex from "knex";
import bCrypt from "bcryptjs";
import knexConfigs from "../../knex.configs";


async function seed(pg) {


  await pg("users").insert([
    {
      username: "jon123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Joni",
      surname: "Joloni",
      email: "example@gmail.com",
      position:"Ftv Model",
      created_at: new Date(),
    },
    {
      username: "nastya123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Nastya",
      surname: "Nikoxosyan",
      email: "nastya@gmail.com",
      position:"Programmer",
      created_at: new Date(),
    },
    {
      username: "kara123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Karine",
      surname: "Karapetyan",
      email: "karine@gmail.com",
      position:"Tv Actresses",
      created_at: new Date(),
    },
    {
      username: "john123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "John",
      surname: "Doe",
      email: "john.doe@gmail.com",
      position:"Student",
      created_at: new Date(),
    },
    {
      username: "jason123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Jason",
      surname: "Borne",
      email: "jason.borne@gmail.com",
      position:"Student",
      created_at: new Date(),
    },
    {
      username: "alexendra123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Alexendra",
      surname: "Dadrio",
      email: "alexendra.dadrio@gmail.com",
      position:"Student",
      created_at: new Date(),
    },
    {
      username: "andy123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Andy",
      surname: "Smith",
      email: "andy.smith@gmail.com",
      position:"Student",
      created_at: new Date(),
    },
      {
      username: "janice123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Janice",
      surname: "Griffith",
      email: "janice.griffith@gmail.com",
      position:"Student",
      created_at: new Date(),
    },
    {
      username: "sarah123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Sarah",
      surname: "Connor",
      email: "sarah.connor@gmail.com",
      position:"Student",
      created_at: new Date(),
    },
    {
      username: "bolt123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Bolt",
      surname: "Speedster",
      email: "bolt.speedster@gmail.com",
      position:"Student",
      created_at: new Date(),
    },

  ]);



}













async function init() {
  try {
    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;
    const pg = knex(options);
    await seed(pg);
    console.log("Successfully inserted all data ... ");
    process.kill(process.pid);
  } catch (error) {
    console.error(error.message);
  }
}

init();

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
      // profileImg:`/upload/1/profile/${}`,
      // coverImg: "https://img.freepik.com/free-photo/cosmetics-product-advertising-stand-exhibition-wooden-podium-green-background-with-leaves-sha_1258-170138.jpg",
      position:"Ftv Model",
      created_at: new Date(),
    },
  // ])
    {
      username: "nastya123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Nastya",
      surname: "Nikoxosyan",
      email: "nastya@gmail.com",
      // coverImg: "https://img.freepik.com/free-photo/cosmetics-product-advertising-stand-exhibition-wooden-podium-green-background-with-leaves-sha_1258-170138.jpg",
      // profileImg:"https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar10.jpg",
      // coverImg:"https://wpkixx.com/html/winku/images/resources/timeline-1.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar10.jpg",
      // coverImg:"https://wpkixx.com/html/winku/images/resources/timeline-1.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar5.jpg",
      // coverImg:"https://wpkixx.com/html/winku/images/resources/timeline-1.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-2.jpg",
      // coverImg:"https://wpkixx.com/html/winku/images/resources/timeline-1.jpg",
      created_at: new Date(),
    },
    {
      username: "andy123",
      password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
      role: "User",
      name: "Andy",
      surname: "Smith",
      email: "andy.smith@gmail.com",
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-3.jpg",
      // coverImg:"https://wpkixx.com/html/winku/images/resources/timeline-1.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar11.jpg",
      // coverImg: "https://img.freepik.com/free-photo/cosmetics-product-advertising-stand-exhibition-wooden-podium-green-background-with-leaves-sha_1258-170138.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-2.jpg",
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
      // profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar8.jpg",
      // coverImg: "https://img.freepik.com/free-photo/cosmetics-product-advertising-stand-exhibition-wooden-podium-green-background-with-leaves-sha_1258-170138.jpg",
      position:"Student",
      created_at: new Date(),
    },
    // {
    //   username: "issabel123",
    //   password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
    //   role: "User",
    //   name: "Issabel",
    //   surname: "Everest",
    //   email: "issabel.everest@gmail.com",
    //   // profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar4.jpg",
    //   created_at: new Date(),
    // }
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

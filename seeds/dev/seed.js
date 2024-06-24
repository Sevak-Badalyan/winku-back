// NPM Modules
import knex from "knex";
import bCrypt from "bcryptjs";
import knexConfigs from "../../knex.configs";


async function seed(pg) {

  // await pg("users").insert({
  //   username: "sevak123",
  //   password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
  //   role: "User",
  //   name: "Sevak",
  //   surname: "Badalyan",
  //   email: "example@gmail.com",
  //   created_at: new Date(),
  // })

  // await pg("users").insert({
  //   username: "nastya123",
  //   password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
  //   role: "User",
  //   name: "Nastya",
  //   surname: "Nikoxosyan",
  //   email: "nastya@gmail.com",
  //   created_at: new Date(),
  // })

  // await pg("users").insert({
  //   username: "kara123",
  //   password: bCrypt.hashSync("zxcv", bCrypt.genSaltSync(5)),
  //   role: "User",
  //   name: "Karine",
  //   surname: "Karapetyan",
  //   email: "karine@gmail.com",
  //   profileImg:"https://www.wpkixx.com/html/winku/images/resources/friend-avatar10.jpg",
  //   created_at: new Date(),
  // })







  // await pg("posts").insert({
  //   postText: "postText  loremmm qooq njschbjdvchgdsvgvcv",
  //   postPhoto: "img",
  //   user_id:1,
  //   created_at: new Date(),
  // })
  // await pg("posts").insert({
  //   postText: "postText  loremmm qooq njschbjdvchgdsvgvcv222222222222222",
  //   postPhoto: "https://www.wpkixx.com/html/winku/images/resources/user-post.jpg",
  //   user_id:2,
  //   created_at: new Date(),
  // })
  // await pg("posts").insert({
  //   postText: "postText  loremmm qooq njschbjdvchgdsvgvcv33333333333",
  //   postPhoto: "img",
  //   user_id:3,
  //   created_at: new Date(),
  // })


  // await pg("comments").insert({
  //   posts_id: 1,
  //   commentText:"aystex karox e linel dzer comment@)",
  //   user_id:3,
  //   created_at: new Date(),
  // })
  // await pg("comments").insert({
  //   posts_id: 3,
  //   commentText:"aystex karox e linel dzer comment@ 2222222222222222)",
  //     user_id:2,
  //     created_at: new Date(),
  //   })
  //   await pg("comments").insert({
  //     posts_id: 2,
  //     user_id:1,
  //     commentText:"aystex karox e linel dzer comment@ 333333333)",
  //     created_at: new Date(),
  //   })
  //   await pg("replies").insert({
  //     repliesText:"aystex karox e linel dzer reply@)",
  //     comments_id: 1,
  //     user_id:1,
  //     created_at: new Date(),
  //   })
  //   await pg("replies").insert({
  //     comments_id: 2,
  //     repliesText:"aystex karox e linel dzer reply@222)",
  //     user_id:3,
  //     created_at: new Date(),
  //   })
  //   await pg("replies").insert({
  //     comments_id: 3,
  //     repliesText:"aystex karox e linel dzer reply user 1 to 3com)",
  //     user_id:1,
  //     created_at: new Date(),
  //   })












  // stexic

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

  // // Insert posts
  // await pg("posts").insert([
  //   {
  //     postText: "postText loremmm qooq njschbjdvchgdsvgvcv",
  //     postPhoto: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     user_id: 1,
  //     created_at: new Date(),
  //   },
  //   {
  //     postText: "Lonely Cat Enjoying in Summer Curabitur #mypage ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,",
  //     postPhoto: "https://www.wpkixx.com/html/winku/images/resources/user-post.jpg",
  //     user_id: 4,
  //     created_at: new Date("2018-06-02T19:00:00"),
  //   },
  //   {
  //     postText: "postText loremmm qooq njschbjdvchgdsvgvcv222222222222222",
  //     postPhoto: "https://www.wpkixx.com/html/winku/images/resources/user-post.jpg",
  //     user_id: 2,
  //     created_at: new Date(),
  //   },
  //   {
  //     postText: "postText loremmm qooq njschbjdvchgdsvgvcv33333333333",
  //     postPhoto: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     user_id: 3,
  //     created_at: new Date(),
  //   },
  //   {
  //     postText: "postText loremmm qooq njschbjdvchgdsvgvcv33333333333",
  //     postPhoto: "img",
  //     user_id: 3,
  //     created_at: new Date(),
  //   }
  // ]);

  // // Insert comments
  // await pg("comments").insert([
  //   {
  //     posts_id: 1,
  //     commentText: "aystex karox e linel dzer comment@)",
  //     user_id: 3,
  //     created_at: new Date(),
  //   },
  //   {
  //     posts_id: 2,
  //     commentText: "we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post",
  //     user_id: 5,
  //     created_at: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // 1 year ago
  //   },
  //   {
  //     posts_id: 3,
  //     commentText: "aystex karox e linel dzer comment@ 2222222222222222)",
  //     user_id: 2,
  //     created_at: new Date(),
  //   },
  //   {
  //     posts_id: 2,
  //     user_id: 1,
  //     commentText: "aystex karox e linel dzer comment@ 333333333)",
  //     created_at: new Date(),
  //   }
  // ]);

  // // Insert replies
  // await pg("replies").insert([
  //   {
  //     repliesText: "aystex karox e linel dzer reply@)",
  //     comments_id: 1,
  //     user_id: 1,
  //     created_at: new Date(),
  //   },
  //   {
  //     comments_id: 2,
  //     repliesText: "yes, really very awesome car i see the features of this car in the official website of #Mercedes-Benz and really impressed :-)",
  //     user_id: 6,
  //     created_at: new Date(new Date().setMonth(new Date().getMonth() - 1)), // 1 month ago
  //   },
  //   {
  //     comments_id: 2,
  //     repliesText: "i like lexus cars, lexus cars are most beautiful with the awesome features, but this car is really outstanding than lexus",
  //     user_id: 7,
  //     created_at: new Date(new Date().setDate(new Date().getDate() - 16)), // 16 days ago
  //   },
  //   {
  //     comments_id: 3,
  //     repliesText: "aystex karox e linel dzer reply@222)",
  //     user_id: 3,
  //     created_at: new Date(),
  //   },
  //   {
  //     comments_id: 4,
  //     repliesText: "aystex karox e linel dzer reply user 1 to 3com)",
  //     user_id: 1,
  //     created_at: new Date(),
  //   }
  // ]);




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

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import processing from "./processing.js";

// import { Confirmation } from "./vkmodules.mjs";
// console.log("TCL: Confirmation", Confirmation);
// import performance from './performance';

const PORT = process.env.PORT;
const CONFIRMATION = process.env.CONFIRMATION;
const TOKEN = process.env.TOKEN;

console.log("Conf", CONFIRMATION, "Порт", PORT, "Token", TOKEN);

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => res.send("Hello ES6!"));
server.post("/", (req, res) => {
  const { body } = req;
  switch (body.type) {
    case "confirmation":
      res.end(CONFIRMATION);
      break;

    case "message_new":
      processing(body.object);
      res.end("ok");
      break;

    case "lead_forms_new":
      
      console.log(body.object.answers[0].answer);
      res.end("ok");

      // This means 1 new row will be inserted into the Sheet

      const name = body.object.answers[0].answer;
      let tel = body.object.answers[1].answer;
      tel = tel.replace(/\D/g, '')
      
      console.log("TCL: tel", typeof(tel));
      

      const data = [
        {
          Имя: name,
          Телефон: tel
        }
      ];
      console.log("TCL: data", data)

      fetch(
        "https://sheet.best/api/sheets/6fff4bff-7061-44ef-8b9e-a3f9df4d3a93",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((r) => r.json())
        .then((data) => {
          // The response comes here
          console.log(data);
        })
        .catch((error) => {
          // Errors are reported there
          console.log(error);
        });
      break;

    default:
      res.end("ok");
      break;
  }
});

server.listen(PORT, () =>
  console.log(`Example server listening on port ${PORT}!`)
);

const tel = "+7 (999) 790-21-23";
var regExpClear = /[^\w]/g;
console.log("TCL: tel", tel.replace(/\D/g, ''))

export default server;

// https://sheet.best/api/sheets/6fff4bff-7061-44ef-8b9e-a3f9df4d3a93

// {
//   type: 'message_new',
//   object: {
//     message: {
//       date: 1587586231,
//       from_id: 8825124,
//       id: 46,
//       out: 0,
//       peer_id: 8825124,
//       text: 'test5',
//       conversation_message_id: 46,
//       fwd_messages: [],
//       important: false,
//       random_id: 0,
//       attachments: [],
//       is_hidden: false
//     },
//     client_info: {
//       button_actions: [Array],
//       keyboard: true,
//       inline_keyboard: true,
//       lang_id: 0
//     }
//   },
//   group_id: 194465051,
//   event_id: '14f2cb7622f5f75f72d16d748b9d4e3730442a3d'
// }

// {"type":"lead_forms_new","object":{"lead_id":790143,"group_id":194465051,"user_id":8825124,"form_id":1,"form_name":"Форма 20.04.20","answers":[{"key":"first_name","question":"Имя","answer":"Илюша"},{"key":"phone_number","question":"Номер телефона","answer":"+7 (999) 790-21-23"}]},"group_id":194465051,"event_id":"9a03740b45f176a7edf612e2019f1fcfd73653c2"}

/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const getDepts = () => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            "success": true,
            "data": [
              {
                "id": 10,
                "item_id": 4,
                "name": "Медицина",
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null,
                "subdepts": {
                  "58": {
                    "id": 58,
                    "item_id": 10006356,
                    "name": "УЗИ",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "59": {
                    "id": 59,
                    "item_id": 10019730,
                    "name": "Холтер",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "60": {
                    "id": 60,
                    "item_id": 10019731,
                    "name": "ЭКГ",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "61": {
                    "id": 61,
                    "item_id": 10008373,
                    "name": "Лабораторная диагностика CMD",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "62": {
                    "id": 62,
                    "item_id": 10008375,
                    "name": "Лаборатррная диагностика CMD - программы",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "63": {
                    "id": 63,
                    "item_id": 10038191,
                    "name": "Лабораторная диагностика INVITRO",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "64": {
                    "id": 64,
                    "item_id": 10013059,
                    "name": "Аллергология-иммунология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "65": {
                    "id": 65,
                    "item_id": 10019705,
                    "name": "Гастроэнтерология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "66": {
                    "id": 66,
                    "item_id": 10009840,
                    "name": "Гинекология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "67": {
                    "id": 67,
                    "item_id": 10019704,
                    "name": "Дерматовенерология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "68": {
                    "id": 68,
                    "item_id": 10006357,
                    "name": "Кардиология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "69": {
                    "id": 69,
                    "item_id": 10019707,
                    "name": "Детский массаж",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "70": {
                    "id": 70,
                    "item_id": 30,
                    "name": "Массаж",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "71": {
                    "id": 71,
                    "item_id": 10007705,
                    "name": "Неврология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "72": {
                    "id": 72,
                    "item_id": 10007937,
                    "name": "Остеопатия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "73": {
                    "id": 73,
                    "item_id": 10004645,
                    "name": "Отоларингология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "74": {
                    "id": 74,
                    "item_id": 10052528,
                    "name": "Офтальмология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "75": {
                    "id": 75,
                    "item_id": 10018260,
                    "name": "Терапия клиническая",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "76": {
                    "id": 76,
                    "item_id": 10019706,
                    "name": "Рефлексотерапия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "77": {
                    "id": 77,
                    "item_id": 10008174,
                    "name": "Косметология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "78": {
                    "id": 78,
                    "item_id": 10008332,
                    "name": "Педиатрия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "79": {
                    "id": 79,
                    "item_id": 10018268,
                    "name": "Психология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "80": {
                    "id": 80,
                    "item_id": 10021862,
                    "name": "Логопедия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "81": {
                    "id": 81,
                    "item_id": 10052529,
                    "name": "Урология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "82": {
                    "id": 82,
                    "item_id": 10052530,
                    "name": "Хирургия клиническая",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "83": {
                    "id": 83,
                    "item_id": 10007938,
                    "name": "Эндокринология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "84": {
                    "id": 84,
                    "item_id": 10001806,
                    "name": "Удаленные",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  }
                },
                "groups": {
                  "410": {
                    "id": 410,
                    "item_id": 5641,
                    "name": "УЛЬТРАЗВУКОВАЯ ДИАГНОСТИКА",
                    "dept": 4,
                    "subdept": 10006356,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "411": {
                    "id": 411,
                    "item_id": 5667,
                    "name": "УЛЬТРАЗВУКОВОЕ ИССЛЕДОВАНИЕ СУСТАВОВ",
                    "dept": 4,
                    "subdept": 10006356,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "412": {
                    "id": 412,
                    "item_id": 5668,
                    "name": "УЛЬТРАЗВУКОВОЕ ИССЛЕДОВАНИЕ ГИНЕКОЛОГИЧЕСКОЕ",
                    "dept": 4,
                    "subdept": 10006356,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "413": {
                    "id": 413,
                    "item_id": 5669,
                    "name": "ДУПЛЕКСНОЕ СКАНИРОВАНИЕ",
                    "dept": 4,
                    "subdept": 10006356,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "414": {
                    "id": 414,
                    "item_id": 19516,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10006356,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "415": {
                    "id": 415,
                    "item_id": 19517,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10019731,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "416": {
                    "id": 416,
                    "item_id": 1617,
                    "name": "Услуги процедурного кабинета",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "417": {
                    "id": 417,
                    "item_id": 19526,
                    "name": "Скрытые услуги (части комплексных ил программ обслуживания)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 1617,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "418": {
                    "id": 418,
                    "item_id": 16449,
                    "name": "ПОЛИМЕРАЗНАЯ ЦЕПНАЯ РЕАКЦИЯ (ПЦР)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "419": {
                    "id": 419,
                    "item_id": 16450,
                    "name": "БАКТЕРИАЛЬНЫЕ  ИНФЕКЦИИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16449,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "420": {
                    "id": 420,
                    "item_id": 16451,
                    "name": "Хламидии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "421": {
                    "id": 421,
                    "item_id": 16455,
                    "name": "Микоплазмы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "422": {
                    "id": 422,
                    "item_id": 16462,
                    "name": "Гарднереллы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "423": {
                    "id": 423,
                    "item_id": 16464,
                    "name": "Трепонемы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "424": {
                    "id": 424,
                    "item_id": 16466,
                    "name": "Нейссерии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "425": {
                    "id": 425,
                    "item_id": 16470,
                    "name": "Микобактерии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "426": {
                    "id": 426,
                    "item_id": 16473,
                    "name": "Листерии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "427": {
                    "id": 427,
                    "item_id": 16477,
                    "name": "Стрептококки группы А",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "428": {
                    "id": 428,
                    "item_id": 16479,
                    "name": "Стрептококки группы В",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "429": {
                    "id": 429,
                    "item_id": 16483,
                    "name": "Синегнойная палочка",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "430": {
                    "id": 430,
                    "item_id": 16485,
                    "name": "Коклюш",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16450,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "431": {
                    "id": 431,
                    "item_id": 16487,
                    "name": "КИШЕЧНЫЕ ИНФЕКЦИИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16449,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "432": {
                    "id": 432,
                    "item_id": 16492,
                    "name": "ГРИБКОВЫЕ  ИНФЕКЦИИ  И  ПРОСТЕЙШИЕ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16449,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "433": {
                    "id": 433,
                    "item_id": 16493,
                    "name": "Кандида",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16492,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "434": {
                    "id": 434,
                    "item_id": 16495,
                    "name": "Токсоплазма",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16492,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "435": {
                    "id": 435,
                    "item_id": 16498,
                    "name": "Трихомонады",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16492,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "436": {
                    "id": 436,
                    "item_id": 16501,
                    "name": "Пневмоцисты",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16492,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "437": {
                    "id": 437,
                    "item_id": 16503,
                    "name": "ВИРУСНЫЕ ИНФЕКЦИИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16449,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "438": {
                    "id": 438,
                    "item_id": 16504,
                    "name": "Вирус гепатита A",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "439": {
                    "id": 439,
                    "item_id": 16519,
                    "name": "Вирус гепатита D",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "440": {
                    "id": 440,
                    "item_id": 16521,
                    "name": "Вирус гепатита G",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "441": {
                    "id": 441,
                    "item_id": 16523,
                    "name": "Цитомегаловирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "442": {
                    "id": 442,
                    "item_id": 16528,
                    "name": "Вирус простого герпеса",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "443": {
                    "id": 443,
                    "item_id": 16532,
                    "name": "Вирус герпеса VI типа",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "444": {
                    "id": 444,
                    "item_id": 16535,
                    "name": "Вирус Эпштейна-Барр",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "445": {
                    "id": 445,
                    "item_id": 16538,
                    "name": "Вирус Варицелла - Зостер",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "446": {
                    "id": 446,
                    "item_id": 16541,
                    "name": "Папилломавирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "447": {
                    "id": 447,
                    "item_id": 16556,
                    "name": "Энтеровирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "448": {
                    "id": 448,
                    "item_id": 16559,
                    "name": "Аденовирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "449": {
                    "id": 449,
                    "item_id": 16561,
                    "name": "Вирусы гриппа А и В , парагриппа 1,2,3,4 типов",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "450": {
                    "id": 450,
                    "item_id": 16566,
                    "name": "Парвовирус В19",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "451": {
                    "id": 451,
                    "item_id": 16575,
                    "name": "Вирус краснухи",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "452": {
                    "id": 452,
                    "item_id": 16578,
                    "name": "Респираторно-синцитиальный вирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "453": {
                    "id": 453,
                    "item_id": 16580,
                    "name": "Комплексная диагностика ОРВИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "454": {
                    "id": 454,
                    "item_id": 16583,
                    "name": "Вирус ЗИКА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16503,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "455": {
                    "id": 455,
                    "item_id": 16587,
                    "name": "МУЛЬТИПРАЙМ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "456": {
                    "id": 456,
                    "item_id": 16588,
                    "name": "ИППП мультипрайм исследования",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "457": {
                    "id": 457,
                    "item_id": 16596,
                    "name": "Респираторные мультипрайм исследования",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "458": {
                    "id": 458,
                    "item_id": 16600,
                    "name": "Коронавирусы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "459": {
                    "id": 459,
                    "item_id": 16604,
                    "name": "Герпесвирусные мультипрайм исследования",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "460": {
                    "id": 460,
                    "item_id": 16610,
                    "name": "Стафилококки",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "461": {
                    "id": 461,
                    "item_id": 16612,
                    "name": "Бактериальный вагиноз",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "462": {
                    "id": 462,
                    "item_id": 16614,
                    "name": "Клещевые инфекции",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "463": {
                    "id": 463,
                    "item_id": 16623,
                    "name": "Вирусные мультипрайм исследования",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16587,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "464": {
                    "id": 464,
                    "item_id": 16625,
                    "name": "РЕАКЦИЯ  ТРАНСКРИПЦИОННОЙ АМПЛИФИКАЦИИ (РЕАКЦИЯ NASBA)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "465": {
                    "id": 465,
                    "item_id": 16631,
                    "name": "ГЕНЕТИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "466": {
                    "id": 466,
                    "item_id": 16661,
                    "name": "ЗАКЛЮЧЕНИЕ ВРАЧА-ГЕНЕТИКА (Заключение врача-генетика проводится только для услуг, выполняемых в лаборатории CMD. Врач-генетик описывает результат после готовности генетического исследования.)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16631,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "467": {
                    "id": 467,
                    "item_id": 16682,
                    "name": "ЦИТОГЕНЕТИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "468": {
                    "id": 468,
                    "item_id": 16684,
                    "name": "Молекулярно-цитогенетические исследования (FISH)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16682,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "469": {
                    "id": 469,
                    "item_id": 16693,
                    "name": "МАРКЕРЫ ИНФЕКЦИОННЫХ ЗАБОЛЕВАНИЙ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "470": {
                    "id": 470,
                    "item_id": 16694,
                    "name": "Вирус гепатита A",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "471": {
                    "id": 471,
                    "item_id": 16697,
                    "name": "Вирус гепатита B",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "472": {
                    "id": 472,
                    "item_id": 16705,
                    "name": "Вирус гепатита C",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "473": {
                    "id": 473,
                    "item_id": 16708,
                    "name": "Вирус гепатита D",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "474": {
                    "id": 474,
                    "item_id": 16711,
                    "name": "Вирус гепатита E",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "475": {
                    "id": 475,
                    "item_id": 16714,
                    "name": "Сифилис",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "476": {
                    "id": 476,
                    "item_id": 16721,
                    "name": "ВИЧ (Вирус иммунодефицита человека)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "477": {
                    "id": 477,
                    "item_id": 16723,
                    "name": "Вирус простого герпеса",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "478": {
                    "id": 478,
                    "item_id": 16729,
                    "name": "Цитомегаловирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "479": {
                    "id": 479,
                    "item_id": 16733,
                    "name": "Вирус краснухи",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "480": {
                    "id": 480,
                    "item_id": 16737,
                    "name": "Вирус кори",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "481": {
                    "id": 481,
                    "item_id": 16740,
                    "name": "Вирус паротита",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "482": {
                    "id": 482,
                    "item_id": 16743,
                    "name": "Вирус Эпштейна- Барр",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "483": {
                    "id": 483,
                    "item_id": 16748,
                    "name": "Хеликобактер",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "484": {
                    "id": 484,
                    "item_id": 16753,
                    "name": "Хламидии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "485": {
                    "id": 485,
                    "item_id": 16760,
                    "name": "Микоплазмы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "486": {
                    "id": 486,
                    "item_id": 16767,
                    "name": "Токсоплазмы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "487": {
                    "id": 487,
                    "item_id": 16771,
                    "name": "Лямблии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "488": {
                    "id": 488,
                    "item_id": 16775,
                    "name": "Гельминты",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "489": {
                    "id": 489,
                    "item_id": 16784,
                    "name": "Уреаплазмы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "490": {
                    "id": 490,
                    "item_id": 16788,
                    "name": "Вирус герпеса VI типа",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "491": {
                    "id": 491,
                    "item_id": 16790,
                    "name": "Парвовирус В19",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "492": {
                    "id": 492,
                    "item_id": 16793,
                    "name": "Вирус ветряной оспы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "493": {
                    "id": 493,
                    "item_id": 16796,
                    "name": "Диагностика кандидоза и аспергиллеза",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "494": {
                    "id": 494,
                    "item_id": 16799,
                    "name": "Вирус клещевого энцефалита",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "495": {
                    "id": 495,
                    "item_id": 16802,
                    "name": "Вирус денге",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "496": {
                    "id": 496,
                    "item_id": 16805,
                    "name": "Коклюш",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "497": {
                    "id": 497,
                    "item_id": 16809,
                    "name": "Вирус Западного Нила",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "498": {
                    "id": 498,
                    "item_id": 16812,
                    "name": "Боррелии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "499": {
                    "id": 499,
                    "item_id": 16815,
                    "name": "Легионеллы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "500": {
                    "id": 500,
                    "item_id": 16817,
                    "name": "Туберкулез",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "501": {
                    "id": 501,
                    "item_id": 16819,
                    "name": "Столбняк",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "502": {
                    "id": 502,
                    "item_id": 16821,
                    "name": "Коронавирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "503": {
                    "id": 503,
                    "item_id": 16825,
                    "name": "Клостридии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "504": {
                    "id": 504,
                    "item_id": 16827,
                    "name": "Криптоспоридии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "505": {
                    "id": 505,
                    "item_id": 16829,
                    "name": "Аденовирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "506": {
                    "id": 506,
                    "item_id": 16831,
                    "name": "Ротавирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "507": {
                    "id": 507,
                    "item_id": 16833,
                    "name": "Норовирус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16693,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "508": {
                    "id": 508,
                    "item_id": 16835,
                    "name": "РЕАКЦИЯ ГЕМАГГЛЮТИНАЦИИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "509": {
                    "id": 509,
                    "item_id": 16836,
                    "name": "Коклюш и паракоклюш",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "510": {
                    "id": 510,
                    "item_id": 16838,
                    "name": "Менингококк",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "511": {
                    "id": 511,
                    "item_id": 16840,
                    "name": "Шигеллы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "512": {
                    "id": 512,
                    "item_id": 16842,
                    "name": "Псевдотуберкулез и иерсиниоз",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "513": {
                    "id": 513,
                    "item_id": 16844,
                    "name": "Сальмонеллез",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "514": {
                    "id": 514,
                    "item_id": 16846,
                    "name": "Брюшной тиф",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "515": {
                    "id": 515,
                    "item_id": 16848,
                    "name": "Дифтерия",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "516": {
                    "id": 516,
                    "item_id": 16850,
                    "name": "Туляремия",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "517": {
                    "id": 517,
                    "item_id": 16852,
                    "name": "Бруцеллез",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "518": {
                    "id": 518,
                    "item_id": 16854,
                    "name": "Сыпной тиф",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16835,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "519": {
                    "id": 519,
                    "item_id": 16856,
                    "name": "ГОРМОНЫ И АУТОАНТИТЕЛА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "520": {
                    "id": 520,
                    "item_id": 16857,
                    "name": "Фертильность и репродукция",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "521": {
                    "id": 521,
                    "item_id": 16868,
                    "name": "Пренатальная диагностика",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "522": {
                    "id": 522,
                    "item_id": 16876,
                    "name": "Андрогены",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "523": {
                    "id": 523,
                    "item_id": 16884,
                    "name": "Тиреоидная панель",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "524": {
                    "id": 524,
                    "item_id": 16892,
                    "name": "Гормоны коры надпочечников",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "525": {
                    "id": 525,
                    "item_id": 16895,
                    "name": "Гормоны гипофиза",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "526": {
                    "id": 526,
                    "item_id": 16899,
                    "name": "Гормоны поджелудочной железы",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "527": {
                    "id": 527,
                    "item_id": 16903,
                    "name": "Аутоантитела",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "528": {
                    "id": 528,
                    "item_id": 16951,
                    "name": "Нейроэндокринная система",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "529": {
                    "id": 529,
                    "item_id": 16954,
                    "name": "Метаболиты",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "530": {
                    "id": 530,
                    "item_id": 16957,
                    "name": "Онкомаркеры",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16856,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "531": {
                    "id": 531,
                    "item_id": 16975,
                    "name": "ГОРМОНЫ ПАРАЩИТОВИДНЫХ ЖЕЛЕЗ И МАРКЕРЫ ОСТЕОПОРОЗА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "532": {
                    "id": 532,
                    "item_id": 16982,
                    "name": "БИОХИМИЧЕСКИЙ АНАЛИЗ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "533": {
                    "id": 533,
                    "item_id": 16983,
                    "name": "Исследование крови",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16982,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "534": {
                    "id": 534,
                    "item_id": 17053,
                    "name": "Исследование мочи",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16982,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "535": {
                    "id": 535,
                    "item_id": 17069,
                    "name": "Исследование кала",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16982,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "536": {
                    "id": 536,
                    "item_id": 17072,
                    "name": "ДИАГНОСТИКА МОЧЕКАМЕННОЙ БОЛЕЗНИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 16982,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "537": {
                    "id": 537,
                    "item_id": 17074,
                    "name": "ГЕМОСТАЗИОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "538": {
                    "id": 538,
                    "item_id": 17084,
                    "name": "ОБЩЕКЛИНИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "539": {
                    "id": 539,
                    "item_id": 17085,
                    "name": "Исследование крови",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "540": {
                    "id": 540,
                    "item_id": 17110,
                    "name": "Исследование кала",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "541": {
                    "id": 541,
                    "item_id": 17103,
                    "name": "Исследование мочи",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "542": {
                    "id": 542,
                    "item_id": 17118,
                    "name": "Микроскопические исследования мазка у женщин",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "543": {
                    "id": 543,
                    "item_id": 17125,
                    "name": "Микроскопические исследования мазка у женщин с окраской по Граму",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "544": {
                    "id": 544,
                    "item_id": 17128,
                    "name": "Микроскопические исследования мазка у мужчин",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "545": {
                    "id": 545,
                    "item_id": 17133,
                    "name": "Микроскопическое исследование синовиальной жидкости",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "546": {
                    "id": 546,
                    "item_id": 17135,
                    "name": "Исследование эякулята",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "547": {
                    "id": 547,
                    "item_id": 17140,
                    "name": "Исследование кожи и ногтевых пластинок",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17084,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "548": {
                    "id": 548,
                    "item_id": 17143,
                    "name": "ЦИТОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "549": {
                    "id": 549,
                    "item_id": 17161,
                    "name": "ИММУНОЛОГИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "550": {
                    "id": 550,
                    "item_id": 17162,
                    "name": "Иммунный статус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "551": {
                    "id": 551,
                    "item_id": 17163,
                    "name": "Исследование субпопуляций лимфоцитов",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "552": {
                    "id": 552,
                    "item_id": 17170,
                    "name": "Функциональные  маркеры",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "553": {
                    "id": 553,
                    "item_id": 17174,
                    "name": "Гуморальный иммунитет",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "554": {
                    "id": 554,
                    "item_id": 17180,
                    "name": "Функциональная активность нейтрофилов",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "555": {
                    "id": 555,
                    "item_id": 17182,
                    "name": "Компоненты комплемента",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "556": {
                    "id": 556,
                    "item_id": 17186,
                    "name": "Интерфероновый статус",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "557": {
                    "id": 557,
                    "item_id": 17188,
                    "name": "Чувствительность лейкоцитов крови к препаратам интерферона (заказывается совместно с услугой 130101)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "558": {
                    "id": 558,
                    "item_id": 17198,
                    "name": "Чувствительность лейкоцитов крови к препаратам  индукторам интерферона (заказывается совместно с услугой 130101)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "559": {
                    "id": 559,
                    "item_id": 17204,
                    "name": "Чувствительность лейкоцитов крови к иммуномодуляторам интерферона (заказывается совместно с услугой 130101)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "560": {
                    "id": 560,
                    "item_id": 17217,
                    "name": "Чувствительность лейкоцитов к препаратам разрешенным к применению у детей (заказывается совместно с услугой 130101)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "561": {
                    "id": 561,
                    "item_id": 17231,
                    "name": "Определение нейтрализующих антител к препаратам",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "562": {
                    "id": 562,
                    "item_id": 17241,
                    "name": "Регуляторы и медиаторы иммунного ответа",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17161,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "563": {
                    "id": 563,
                    "item_id": 17247,
                    "name": "БАКТЕРИОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "564": {
                    "id": 564,
                    "item_id": 17273,
                    "name": "МИКРОБИОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ С ИСПОЛЬЗОВАНИЕМ АВТОМАТИЗИРОВАННЫХ МЕТОДОВ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "565": {
                    "id": 565,
                    "item_id": 17274,
                    "name": "ПУНКЦИОННАЯ ЖИДКОСТЬ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "566": {
                    "id": 566,
                    "item_id": 17281,
                    "name": "БИОЛОГИЧЕСКИЙ МАТЕРИАЛ, ПОЛУЧЕННЫЙ ПРИ ХИРУРГИЧЕСКИХ ВМЕШАТЕЛЬСТВАХ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "567": {
                    "id": 567,
                    "item_id": 17291,
                    "name": "МОЧА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "568": {
                    "id": 568,
                    "item_id": 17297,
                    "name": "БИОЛОГИЧЕСКИЙ МАТЕРИАЛ ИЗ ОРГАНОВ МОЧЕПОЛОВОЙ СИСТЕМЫ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "569": {
                    "id": 569,
                    "item_id": 17309,
                    "name": "ГРУДНОЕ МОЛОКО",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "570": {
                    "id": 570,
                    "item_id": 17316,
                    "name": "ОТДЕЛЯЕМОЕ ВЕРХНИХ И НИЖНИХ ДЫХАТЕЛЬНЫХ ПУТЕЙ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "571": {
                    "id": 571,
                    "item_id": 17334,
                    "name": "ОТДЕЛЯЕМОЕ ИЗ УХА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "572": {
                    "id": 572,
                    "item_id": 17341,
                    "name": "ОТДЕЛЯЕМОЕ КОНЪЮКТИВЫ ГЛАЗА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "573": {
                    "id": 573,
                    "item_id": 17350,
                    "name": "ВОЗБУДИТЕЛИ КИШЕЧНЫХ ИНФЕКЦИЙ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "574": {
                    "id": 574,
                    "item_id": 17359,
                    "name": "ЖЕЛЧЬ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17273,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "575": {
                    "id": 575,
                    "item_id": 19169,
                    "name": "АЛЛЕРГОЛОГИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "576": {
                    "id": 576,
                    "item_id": 17364,
                    "name": "ДИАГНОСТИКА АЛЛЕРГИИ с применением технологии ImmunoCAP® (Phadia АВ, Thermo Fisher Scientific, Швеция)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 19169,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "577": {
                    "id": 577,
                    "item_id": 17365,
                    "name": "Первичная диагностика аллергии. Фадиатоп, ImmunoCAP®.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "578": {
                    "id": 578,
                    "item_id": 17368,
                    "name": "Общедиагностические аллергологические исследования.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "579": {
                    "id": 579,
                    "item_id": 17372,
                    "name": "Диагностические (симптоматические) программы обследования, ImmunoCAP® (Phadia АВ)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "580": {
                    "id": 580,
                    "item_id": 17378,
                    "name": "Скрининговые исследования. Определение специфических Ig E к смесям аллергенов (общий результат к смеси).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "581": {
                    "id": 581,
                    "item_id": 17379,
                    "name": "Скрининг ингаляционных аллергенов.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17378,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "582": {
                    "id": 582,
                    "item_id": 17380,
                    "name": "Скрининг аллергенов пыльцы растений. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17379,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "583": {
                    "id": 583,
                    "item_id": 17388,
                    "name": "Скрининг аллергенов животных и домашней пыли. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17379,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "584": {
                    "id": 584,
                    "item_id": 17394,
                    "name": "Скрининг пищевых аллергенов",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17378,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "585": {
                    "id": 585,
                    "item_id": 17401,
                    "name": "Определение индивидуальных аллергенов.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "586": {
                    "id": 586,
                    "item_id": 17402,
                    "name": "Идентификация аллергенов пыльцы злаковых трав. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "587": {
                    "id": 587,
                    "item_id": 17422,
                    "name": "Идентификация аллергенов пыльцы сорных трав. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "588": {
                    "id": 588,
                    "item_id": 17436,
                    "name": "Идентификация аллергенов пыльцы деревьев. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "589": {
                    "id": 589,
                    "item_id": 17458,
                    "name": "Идентификация аллергенов животных.  Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "590": {
                    "id": 590,
                    "item_id": 17467,
                    "name": "Идентификация аллергенов клещей домашней пыли. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "591": {
                    "id": 591,
                    "item_id": 17470,
                    "name": "Идентификация аллергенов насекомых. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "592": {
                    "id": 592,
                    "item_id": 17478,
                    "name": "Идентификация аллергенов микроскопических грибов. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "593": {
                    "id": 593,
                    "item_id": 17486,
                    "name": "Идентификация аллергенов гельминтов.  Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "594": {
                    "id": 594,
                    "item_id": 17489,
                    "name": "Идентификация аллергенов пищевых продуктов. Мясо и яйцо.  Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "595": {
                    "id": 595,
                    "item_id": 17497,
                    "name": "Идентификация аллергенов пищевых продуктов.  Молочные продукты. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "596": {
                    "id": 596,
                    "item_id": 17503,
                    "name": "Идентификация аллергенов пищевых продуктов.  Рыба и морепродукты. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "597": {
                    "id": 597,
                    "item_id": 17512,
                    "name": "Идентификация аллергенов пищевых продуктов.  Семена, бобовые и орехи. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "598": {
                    "id": 598,
                    "item_id": 17533,
                    "name": "Идентификация аллергенов пищевых продуктов.   Овощи. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "599": {
                    "id": 599,
                    "item_id": 17545,
                    "name": "Идентификация аллергенов пищевых продуктов.  Фрукты, ягоды. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "600": {
                    "id": 600,
                    "item_id": 17561,
                    "name": "Идентификация аллергенов пищевых продуктов. Разное.  Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "601": {
                    "id": 601,
                    "item_id": 17569,
                    "name": "Идентификация аллергенов лекарств. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "602": {
                    "id": 602,
                    "item_id": 17575,
                    "name": "Идентификация профессиональных аллергенов. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17401,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "603": {
                    "id": 603,
                    "item_id": 17578,
                    "name": "Молекулярная аллергология. Аллергокомпоненты.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "604": {
                    "id": 604,
                    "item_id": 17580,
                    "name": "Аллергокомпоненты. Ингаляционные аллергены.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "605": {
                    "id": 605,
                    "item_id": 17581,
                    "name": "Идентификация аллергокомпонентов пыльцы растений. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17580,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "606": {
                    "id": 606,
                    "item_id": 17589,
                    "name": "Идентификация аллергокомпонентов животных. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17580,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "607": {
                    "id": 607,
                    "item_id": 17595,
                    "name": "Идентификация  бытовых аллергокомпонентов. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17580,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "608": {
                    "id": 608,
                    "item_id": 17597,
                    "name": "Аллергокомпоненты. Пищевые аллергены.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17364,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "609": {
                    "id": 609,
                    "item_id": 17598,
                    "name": "Идентификация аллергокомпонентов пищевых аллергенов. Ig E, ImmunoCAP® (Phadia АВ).",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17597,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "610": {
                    "id": 610,
                    "item_id": 17611,
                    "name": "ДИАГНОСТИКА АЛЛЕРГИИ с применением тест-систем других производителей.",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 19169,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "611": {
                    "id": 611,
                    "item_id": 17613,
                    "name": "ОПРЕДЕЛЕНИЕ СПЕЦИФИЧЕСКИХ IgE",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 19169,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "612": {
                    "id": 612,
                    "item_id": 17614,
                    "name": "Скрининг ингаляционных аллергенов",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "613": {
                    "id": 613,
                    "item_id": 17626,
                    "name": "Скрининг пищевых аллергенов",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "614": {
                    "id": 614,
                    "item_id": 17634,
                    "name": "Аллергены животных",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "615": {
                    "id": 615,
                    "item_id": 17652,
                    "name": "Пищевые аллергены",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "616": {
                    "id": 616,
                    "item_id": 19170,
                    "name": "Профессиональные аллергены",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "617": {
                    "id": 617,
                    "item_id": 17721,
                    "name": "Гельминты",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "618": {
                    "id": 618,
                    "item_id": 17724,
                    "name": "Аллергены лекарств",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17613,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "619": {
                    "id": 619,
                    "item_id": 17734,
                    "name": "ОПРЕДЕЛЕНИЕ СПЕЦИФИЧЕСКИХ IgG",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 19169,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "620": {
                    "id": 620,
                    "item_id": 17738,
                    "name": "МИКРОСКОПИЧЕСКИЕ ИССЛЕДОВАНИЯ в аллергологии",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 19169,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "621": {
                    "id": 621,
                    "item_id": 17741,
                    "name": "ГИСТОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "622": {
                    "id": 622,
                    "item_id": 17758,
                    "name": "Дополнительные методы исследования",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17741,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "623": {
                    "id": 623,
                    "item_id": 17765,
                    "name": "НЕИНВАЗИВНАЯ ДИАГНОСТИКА ЗАБОЛЕВАНИЙ ПЕЧЕНИ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "624": {
                    "id": 624,
                    "item_id": 17768,
                    "name": "ИММУНОГИСТОХИМИЧЕСКИЕ ИССЛЕДОВАНИЯ (Материалом для исследования служат парафиновые блоки, полученные в результате гистологического исследования операционного материала или биоптатов)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "625": {
                    "id": 625,
                    "item_id": 17789,
                    "name": "МЕТОД АТОМНО-ЭММИСИОННОЙ И МАСС-СПЕКТРОМЕТРИИ С ИНДУКТИВНО СВЯЗАННОЙ АРГОНОВОЙ ПЛАЗМОЙ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "626": {
                    "id": 626,
                    "item_id": 17790,
                    "name": "Определение содержания химических элементов (микроэлементы)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17789,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "627": {
                    "id": 627,
                    "item_id": 17876,
                    "name": "ВЫСОКОЭФФЕКТИВНАЯ ЖИДКОСТНАЯ ХРОМАТОГРАФИЯ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "628": {
                    "id": 628,
                    "item_id": 17877,
                    "name": "Витамины и витаминоподобные соединения",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17876,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "629": {
                    "id": 629,
                    "item_id": 17890,
                    "name": "МЕТОД ГАЗОВОЙ ХРОМАТОГРАФИИ С МАСС-СЕЛЕКТИВНЫМ ДЕТЕКТИРОВАНИЕМ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "630": {
                    "id": 630,
                    "item_id": 17891,
                    "name": "Жирные кислоты (насыщенные, мононенасыщенные и полиненасыщенные)",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17890,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "631": {
                    "id": 631,
                    "item_id": 17897,
                    "name": "ЛЕКАРСТВЕННЫЙ МОНИТОРИНГ",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "632": {
                    "id": 632,
                    "item_id": 17903,
                    "name": "НАРКОТИЧЕСКИЕ И ПСИХОАКТИВНЫЕ ВЕЩЕСТВА",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "633": {
                    "id": 633,
                    "item_id": 17904,
                    "name": "Скрининговые тесты",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17903,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "634": {
                    "id": 634,
                    "item_id": 17909,
                    "name": "Подтверждающие тесты",
                    "dept": 4,
                    "subdept": 10008373,
                    "group": 17903,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "635": {
                    "id": 635,
                    "item_id": 7582,
                    "name": "ОБСЛЕДОВАНИЕ ПЕРЕД ГОСПИТАЛИЗАЦИЕЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "636": {
                    "id": 636,
                    "item_id": 7588,
                    "name": "ПРОФИЛАКТИЧЕСКОЕ ОБСЛЕДОВАНИЕ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "637": {
                    "id": 637,
                    "item_id": 13737,
                    "name": "ОБСЛЕДОВАНИЕ В ПЕРИОД РЕАБИЛИТАЦИИ ПОСЛЕ ПЕРЕНЕСЁННОЙ КОРОНАВИРУСНОЙ ИНФЕКЦИИ COVID-19",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "638": {
                    "id": 638,
                    "item_id": 7591,
                    "name": "ДИАГНОСТИКА ЗАБОЛЕВАНИЙ СИСТЕМЫ СВЕРТЫВАНИЯ КРОВИ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "639": {
                    "id": 639,
                    "item_id": 7593,
                    "name": "ДИАГНОСТКА СЕРДЕЧНО-СОСУДИСТЫХ ЗАБОЛЕВАНИЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "640": {
                    "id": 640,
                    "item_id": 7596,
                    "name": "ДИАГНОСТИКА ФУНКЦИИ ЩИТОВИДНОЙ ЖЕЛЕЗЫ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "641": {
                    "id": 641,
                    "item_id": 7600,
                    "name": "ОЦЕНКА ГОРМОНАЛЬНОГО СТАТУСА",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "642": {
                    "id": 642,
                    "item_id": 7606,
                    "name": "ПЛАНИРОВАНИЕ БЕРЕМЕННОСТИ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "643": {
                    "id": 643,
                    "item_id": 7612,
                    "name": "ОБСЛЕДОВАНИЕ БЕРЕМЕННЫХ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "644": {
                    "id": 644,
                    "item_id": 7616,
                    "name": "ПРЕНАТАЛЬНЫЙ СКРИНИНГ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "645": {
                    "id": 645,
                    "item_id": 7621,
                    "name": "ОБСЛЕДОВАНИЕ  ЖЕНЩИН. ФЛОРОЦЕНОЗ - ОЦЕНКА МИКРОФЛОРЫ ВЛАГАЛИЩА",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "646": {
                    "id": 646,
                    "item_id": 7626,
                    "name": "ДИАГНОСТИКА УРОГЕНИТАЛЬНЫХ ИНФЕКЦИЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "647": {
                    "id": 647,
                    "item_id": 7631,
                    "name": "ДИАГНОСТИКА ЗАБОЛЕВАНИЙ КРОВИ (АНЕМИИ)",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "648": {
                    "id": 648,
                    "item_id": 7637,
                    "name": "ДИАГНОСТИКА ЗАБОЛЕВАНИЙ ЖЕЛУДКА",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "649": {
                    "id": 649,
                    "item_id": 7640,
                    "name": "ДИАГНОСТИКА ЗАБОЛЕВАНИЙ ПЕЧЕНИ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "650": {
                    "id": 650,
                    "item_id": 7644,
                    "name": "ДИАГНОСТИКА РИСКОВ РАЗВИТИЯ ОНКОЛОГИЧЕСКИХ ЗАБОЛЕВАНИЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "651": {
                    "id": 651,
                    "item_id": 7648,
                    "name": "ДИАГНОСТИКА УГЛЕВОДНОГО ОБМЕНА (САХАРНЫЙ ДИАБЕТ, МЕТАБОЛИЧЕСКИЙ СИНДРОМ)",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "652": {
                    "id": 652,
                    "item_id": 7661,
                    "name": "ДИАГНОСТИКА АУТОИММУННЫХ ЗАБОЛЕВАНИЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "653": {
                    "id": 653,
                    "item_id": 7670,
                    "name": "ДИАГНОСТИКА ЗАБОЛЕВАНИЙ ОПОРНО-ДВИГАТЕЛЬНОГО АППАРАТА",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "654": {
                    "id": 654,
                    "item_id": 7672,
                    "name": "ДИАГНОСТИКА ПАРАЗИТАРНЫХ ЗАБОЛЕВАНИЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "655": {
                    "id": 655,
                    "item_id": 7675,
                    "name": "ДИАГНОСТИКА КЛЕЩЕВЫХ ИНФЕКЦИЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "656": {
                    "id": 656,
                    "item_id": 13742,
                    "name": "ОБСЛЕДОВАНИЕ МУЖЧИН. АНДРОФЛОР – ОЦЕНКА МИКРОФЛОРЫ УРОГЕНИТАЛЬНОГО ТРАКТА МУЖЧИН",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "657": {
                    "id": 657,
                    "item_id": 13745,
                    "name": "ДИАГНОСТИКА ЗАБОЛЕВАНИЙ ПОЧЕК",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "658": {
                    "id": 658,
                    "item_id": 13746,
                    "name": "ДИАГНОСТИКА НЕЙРОЭНДОКРИННЫХ ОПУХОЛЕЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "659": {
                    "id": 659,
                    "item_id": 13748,
                    "name": "ДИАГНОСТИКА РЕЗИСТЕНТНОСТИ ВИЧ К АНТИРЕТРОВИСНЫМ ПРЕПАРАТАМ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "660": {
                    "id": 660,
                    "item_id": 7676,
                    "name": "ОБСЛЕДОВАНИЕ  ДЕТЕЙ",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "661": {
                    "id": 661,
                    "item_id": 13752,
                    "name": "ЗДОРОВЬЕ И КРАСОТА",
                    "dept": 4,
                    "subdept": 10008375,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "662": {
                    "id": 662,
                    "item_id": 7954,
                    "name": "Прием гинеколога повторный(в течении 1 месяца,без осмотра)",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "663": {
                    "id": 663,
                    "item_id": 8069,
                    "name": "Обезболивание",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "664": {
                    "id": 664,
                    "item_id": 7959,
                    "name": "Назначение лечения",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "665": {
                    "id": 665,
                    "item_id": 7962,
                    "name": "Гинекология диагностические процедуры",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "666": {
                    "id": 666,
                    "item_id": 7970,
                    "name": "Гинекология – лечебные процедуры",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "667": {
                    "id": 667,
                    "item_id": 11140,
                    "name": "Лечение на аппарате ФОТЕК",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 7970,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "668": {
                    "id": 668,
                    "item_id": 8093,
                    "name": "УЗИ Гинекология",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "669": {
                    "id": 669,
                    "item_id": 8103,
                    "name": "Безоперационная интимная контурная пластика",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "670": {
                    "id": 670,
                    "item_id": 11077,
                    "name": "Программы и комплексы",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "671": {
                    "id": 671,
                    "item_id": 19520,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10009840,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "672": {
                    "id": 672,
                    "item_id": 5834,
                    "name": "Дерматология",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "673": {
                    "id": 673,
                    "item_id": 7916,
                    "name": "Удаление новообразований на коже",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "674": {
                    "id": 674,
                    "item_id": 7917,
                    "name": "Лазерное удаление  невусов СО2 лазером",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "675": {
                    "id": 675,
                    "item_id": 8012,
                    "name": "Лазерное удаление кератом",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "676": {
                    "id": 676,
                    "item_id": 7920,
                    "name": "Лазерное удаление папиллом СО-2 лазером",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "677": {
                    "id": 677,
                    "item_id": 7924,
                    "name": "Лазерное удаление бородавок СО-2 лазером",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "678": {
                    "id": 678,
                    "item_id": 8015,
                    "name": "Лазерное удаление милиумов СО-2 лазером",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "679": {
                    "id": 679,
                    "item_id": 7929,
                    "name": "Лазерное удаление контагиозного моллюска СО-2 лазером",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "680": {
                    "id": 680,
                    "item_id": 11356,
                    "name": "Удаление образований жидким азотом",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "681": {
                    "id": 681,
                    "item_id": 9086,
                    "name": "Удаление оброзований аппаратом \"ФОТЕК\"",
                    "dept": 4,
                    "subdept": 10019704,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "682": {
                    "id": 682,
                    "item_id": 11045,
                    "name": "Программы и комплексы",
                    "dept": 4,
                    "subdept": 10006357,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "683": {
                    "id": 683,
                    "item_id": 716,
                    "name": "Детский массаж",
                    "dept": 4,
                    "subdept": 10019707,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "684": {
                    "id": 684,
                    "item_id": 19518,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10006357,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "685": {
                    "id": 685,
                    "item_id": 5754,
                    "name": "Консультации",
                    "dept": 4,
                    "subdept": 10007705,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "686": {
                    "id": 686,
                    "item_id": 5755,
                    "name": "Медицинские услуги",
                    "dept": 4,
                    "subdept": 10007705,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "687": {
                    "id": 687,
                    "item_id": 723,
                    "name": "Мануальная терапия",
                    "dept": 4,
                    "subdept": 10007705,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "688": {
                    "id": 688,
                    "item_id": 19521,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10007705,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "689": {
                    "id": 689,
                    "item_id": 10640,
                    "name": "Процедуры",
                    "dept": 4,
                    "subdept": 10007937,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "690": {
                    "id": 690,
                    "item_id": 5380,
                    "name": "ЛОР обследование",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "691": {
                    "id": 691,
                    "item_id": 5389,
                    "name": "Общие ЛОР манипуляции",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "692": {
                    "id": 692,
                    "item_id": 5396,
                    "name": "Местные ЛОР манипуляции и процедуры: полость носа, околоносовые пазухи, слуховая труба",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "693": {
                    "id": 693,
                    "item_id": 5420,
                    "name": "Местные ЛОР манипуляции и процедуры: глотка",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "694": {
                    "id": 694,
                    "item_id": 5431,
                    "name": "Местные ЛОР манипуляции и процедуры:гортань",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "695": {
                    "id": 695,
                    "item_id": 5436,
                    "name": "Местные ЛОР манипуляции и процедуры: ухо",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "696": {
                    "id": 696,
                    "item_id": 19519,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10004645,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "697": {
                    "id": 697,
                    "item_id": 19659,
                    "name": "Консультация в отфальмологии",
                    "dept": 4,
                    "subdept": 10052528,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "698": {
                    "id": 698,
                    "item_id": 19676,
                    "name": "Диагностика в офтальмологии",
                    "dept": 4,
                    "subdept": 10052528,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "699": {
                    "id": 699,
                    "item_id": 19704,
                    "name": "Манипуляции в офтальмологии",
                    "dept": 4,
                    "subdept": 10052528,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "700": {
                    "id": 700,
                    "item_id": 19820,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10052528,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "701": {
                    "id": 701,
                    "item_id": 19823,
                    "name": "Комплексные услуги и программы",
                    "dept": 4,
                    "subdept": 10052528,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "702": {
                    "id": 702,
                    "item_id": 10745,
                    "name": "Гирудотерапия",
                    "dept": 4,
                    "subdept": 10019706,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "703": {
                    "id": 703,
                    "item_id": 12418,
                    "name": "Гомеопатия",
                    "dept": 4,
                    "subdept": 10018260,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "704": {
                    "id": 704,
                    "item_id": 12485,
                    "name": "Комплексные услуги и программы",
                    "dept": 4,
                    "subdept": 10018260,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "705": {
                    "id": 705,
                    "item_id": 7787,
                    "name": "Косметология",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "706": {
                    "id": 706,
                    "item_id": 5823,
                    "name": "Профессиональное глубокое очищение кожи",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "707": {
                    "id": 707,
                    "item_id": 7789,
                    "name": "Профессиональные терапевтические программы.",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "708": {
                    "id": 708,
                    "item_id": 7793,
                    "name": "Химические пилинги",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "709": {
                    "id": 709,
                    "item_id": 7794,
                    "name": "АППАРАТНАЯ КОСМЕТОЛОГИЯ",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "710": {
                    "id": 710,
                    "item_id": 11051,
                    "name": "MAGIC ONE Лазерная диодная эпиляция на аппарате",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 7794,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "711": {
                    "id": 711,
                    "item_id": 19322,
                    "name": "SECRET RF",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 7794,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "712": {
                    "id": 712,
                    "item_id": 7798,
                    "name": "RF - лифтинг терапевтический на аппарате SECRET RF",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19322,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "713": {
                    "id": 713,
                    "item_id": 19331,
                    "name": "Леонардо HYPER PULSE",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 7794,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "714": {
                    "id": 714,
                    "item_id": 19349,
                    "name": "Фотолечение на аппарате Леонардо HYPER PULSE",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19331,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "715": {
                    "id": 715,
                    "item_id": 19348,
                    "name": "Фотоэпиляция на аппарате Леонардо HYPER PULSE",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19331,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "716": {
                    "id": 716,
                    "item_id": 19345,
                    "name": "GMF II",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 7794,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "717": {
                    "id": 717,
                    "item_id": 7820,
                    "name": "Фотоэпиляциия на аппарате GMF II по технологии ЭЛОС",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19345,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "718": {
                    "id": 718,
                    "item_id": 7816,
                    "name": "Фотолечение АКНЕ на аппарате GMF II по технологии ЭЛОС",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19345,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "719": {
                    "id": 719,
                    "item_id": 7804,
                    "name": "Фотоомоложение на аппарате GMF II по технологии ЭЛОС (рекомендовано курсовое лечение. Выполняется 1 процедура в 14 дней)",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19345,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "720": {
                    "id": 720,
                    "item_id": 7993,
                    "name": "Фотолечение сосудистого рисунка на лице",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19345,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "721": {
                    "id": 721,
                    "item_id": 7812,
                    "name": "Фотолечение гиперпигментации на аппарате GMF II по технологии ЭЛОС",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19345,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "722": {
                    "id": 722,
                    "item_id": 19352,
                    "name": "Фракционный лазер CO2",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 7794,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "723": {
                    "id": 723,
                    "item_id": 7902,
                    "name": "Лазерная шлифовка растяжек",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19352,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "724": {
                    "id": 724,
                    "item_id": 7890,
                    "name": "Лазерная фракционная шлифовка рубцов постакне",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19352,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "725": {
                    "id": 725,
                    "item_id": 7888,
                    "name": "Лазерная фракционная шлифовка рубцов(шрамов)",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19352,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "726": {
                    "id": 726,
                    "item_id": 7877,
                    "name": "Лазерный фракционный пилинг",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19352,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "727": {
                    "id": 727,
                    "item_id": 7884,
                    "name": "Лазерная фракционная шлифовка",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 19352,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "728": {
                    "id": 728,
                    "item_id": 7845,
                    "name": "ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "729": {
                    "id": 729,
                    "item_id": 9772,
                    "name": "Мезотерапия",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "730": {
                    "id": 730,
                    "item_id": 7846,
                    "name": "Мезотерапия лицо",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "731": {
                    "id": 731,
                    "item_id": 7850,
                    "name": "Мезотерапия волосистой части головы",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "732": {
                    "id": 732,
                    "item_id": 9107,
                    "name": "Липолитические коктейли",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "733": {
                    "id": 733,
                    "item_id": 7997,
                    "name": "Плазмотерапия (Плазмолифтинг)",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "734": {
                    "id": 734,
                    "item_id": 12526,
                    "name": "Regen Lab",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 7997,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "735": {
                    "id": 735,
                    "item_id": 7853,
                    "name": "Биоревитализация",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "736": {
                    "id": 736,
                    "item_id": 7863,
                    "name": "Ботулинотерапия",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "737": {
                    "id": 737,
                    "item_id": 7868,
                    "name": "Контурная пластика (импланты интрадермальные)",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "738": {
                    "id": 738,
                    "item_id": 9122,
                    "name": "МЕЗОНИТИ",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "739": {
                    "id": 739,
                    "item_id": 8021,
                    "name": "АППАРАТНАЯ КОСМЕТОЛОГИЯ С ПРИМЕНЕНИЕМ ЛАЗЕРА",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "740": {
                    "id": 740,
                    "item_id": 7876,
                    "name": "Фракционное лазерное омоложение кожи лица",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 8021,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "741": {
                    "id": 741,
                    "item_id": 8020,
                    "name": "Фракционная лазерная шлифовка",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "742": {
                    "id": 742,
                    "item_id": 10332,
                    "name": "Уход за лицом и областью декольте на косметике Janssen",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "743": {
                    "id": 743,
                    "item_id": 10350,
                    "name": "Аппаратная косметология с применением косметики Janssen",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "744": {
                    "id": 744,
                    "item_id": 10356,
                    "name": "Уход за телом на косметике Thalac/Janssen",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "745": {
                    "id": 745,
                    "item_id": 10362,
                    "name": "Поверхностные и срединные химические пилинги",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "746": {
                    "id": 746,
                    "item_id": 10469,
                    "name": "Депиляция воском (Ваксинг)",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "747": {
                    "id": 747,
                    "item_id": 10411,
                    "name": "Домашний уход",
                    "dept": 4,
                    "subdept": 10008174,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "748": {
                    "id": 748,
                    "item_id": 5849,
                    "name": "Основные услуги",
                    "dept": 4,
                    "subdept": 10008332,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "749": {
                    "id": 749,
                    "item_id": 5860,
                    "name": "Вакцинация",
                    "dept": 4,
                    "subdept": 10008332,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "750": {
                    "id": 750,
                    "item_id": 12489,
                    "name": "Комплексные услуги и программы",
                    "dept": 4,
                    "subdept": 10008332,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "751": {
                    "id": 751,
                    "item_id": 19505,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10008332,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "752": {
                    "id": 752,
                    "item_id": 19783,
                    "name": "Консультации",
                    "dept": 4,
                    "subdept": 10052529,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "753": {
                    "id": 753,
                    "item_id": 19784,
                    "name": "Диагностика",
                    "dept": 4,
                    "subdept": 10052529,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "754": {
                    "id": 754,
                    "item_id": 19785,
                    "name": "Манипуляции",
                    "dept": 4,
                    "subdept": 10052529,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "755": {
                    "id": 755,
                    "item_id": 19738,
                    "name": "Комплексы и программы",
                    "dept": 4,
                    "subdept": 10052529,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "756": {
                    "id": 756,
                    "item_id": 19750,
                    "name": "Консультации в хирургии",
                    "dept": 4,
                    "subdept": 10052530,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "757": {
                    "id": 757,
                    "item_id": 19755,
                    "name": "Диагностика в хирургии",
                    "dept": 4,
                    "subdept": 10052530,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "758": {
                    "id": 758,
                    "item_id": 19760,
                    "name": "Манипуляции в хирургии",
                    "dept": 4,
                    "subdept": 10052530,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "759": {
                    "id": 759,
                    "item_id": 11086,
                    "name": "Программы и комплексы",
                    "dept": 4,
                    "subdept": 10007938,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "760": {
                    "id": 760,
                    "item_id": 19522,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 4,
                    "subdept": 10007938,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "761": {
                    "id": 761,
                    "item_id": 10448,
                    "name": "Диагностический блок (индивидуальный)",
                    "dept": 4,
                    "subdept": 10001806,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "762": {
                    "id": 762,
                    "item_id": 10463,
                    "name": "Коррекционно-развивающий блок (индивидуальный и групповой)",
                    "dept": 4,
                    "subdept": 10001806,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "763": {
                    "id": 763,
                    "item_id": 10454,
                    "name": "Коррекционный блок (индивидуальный)",
                    "dept": 4,
                    "subdept": 10001806,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "764": {
                    "id": 764,
                    "item_id": 10444,
                    "name": "Консультативная программа",
                    "dept": 4,
                    "subdept": 10001806,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  }
                }
              },
              {
                "id": 9,
                "item_id": 1,
                "name": "Стоматология",
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null,
                "subdepts": {
                  "43": {
                    "id": 43,
                    "item_id": 10001723,
                    "name": "Стоматологические общие манипуляции",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "44": {
                    "id": 44,
                    "item_id": 12,
                    "name": "Стоматологические диагностические исследования",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "45": {
                    "id": 45,
                    "item_id": 14,
                    "name": "Стоматологическое обезболивание",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "46": {
                    "id": 46,
                    "item_id": 10001720,
                    "name": "Стоматология терапевтическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "47": {
                    "id": 47,
                    "item_id": 10018259,
                    "name": "Пародонтология стоматологическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "48": {
                    "id": 48,
                    "item_id": 10019720,
                    "name": "Стоматология эстетическая и профгигиена",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "49": {
                    "id": 49,
                    "item_id": 10019703,
                    "name": "Стоматология с использованием оптики",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "50": {
                    "id": 50,
                    "item_id": 10001721,
                    "name": "Стоматология хирургическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "51": {
                    "id": 51,
                    "item_id": 10003550,
                    "name": "Имплантология стоматологическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "52": {
                    "id": 52,
                    "item_id": 17,
                    "name": "Стоматология детская",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "53": {
                    "id": 53,
                    "item_id": 21,
                    "name": "Стоматология ортодонтическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "54": {
                    "id": 54,
                    "item_id": 10001722,
                    "name": "Стоматология ортопедическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "55": {
                    "id": 55,
                    "item_id": 10000342,
                    "name": "Услуги на литье в зуботехнической лаборатории",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "56": {
                    "id": 56,
                    "item_id": 10017692,
                    "name": "Услуги зуботехнической лаборатории для внешних стоматологий",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "57": {
                    "id": 57,
                    "item_id": 10019745,
                    "name": "Продажа: гигиенические наборы",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  }
                },
                "groups": {
                  "285": {
                    "id": 285,
                    "item_id": 19839,
                    "name": "Запись исследований на носители",
                    "dept": 1,
                    "subdept": 12,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "286": {
                    "id": 286,
                    "item_id": 19406,
                    "name": "2D диагностика",
                    "dept": 1,
                    "subdept": 12,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "287": {
                    "id": 287,
                    "item_id": 19389,
                    "name": "3D диагностика ЧЛО на аппарате PLANMECA VISO G5",
                    "dept": 1,
                    "subdept": 12,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "288": {
                    "id": 288,
                    "item_id": 19440,
                    "name": "Скрытые услуги (части комплексных услуг или программ обслуживания)",
                    "dept": 1,
                    "subdept": 12,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "289": {
                    "id": 289,
                    "item_id": 19453,
                    "name": "3D диагностика ЛОР органов на аппарате PLANMECA VISO G5",
                    "dept": 1,
                    "subdept": 12,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "290": {
                    "id": 290,
                    "item_id": 9494,
                    "name": "Лечение зубов в седации и во сне",
                    "dept": 1,
                    "subdept": 14,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "291": {
                    "id": 291,
                    "item_id": 19894,
                    "name": "Диагностика перед лечением в наркозе",
                    "dept": 1,
                    "subdept": 14,
                    "group": 9494,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "292": {
                    "id": 292,
                    "item_id": 3237,
                    "name": "Пломбировка полостей. Средний кариес",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "293": {
                    "id": 293,
                    "item_id": 3242,
                    "name": "Пломбировка полостей. Глубокий кариес",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "294": {
                    "id": 294,
                    "item_id": 3247,
                    "name": "Восстановление коронковой части зуба",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "295": {
                    "id": 295,
                    "item_id": 3252,
                    "name": "Пломбировка полостей. Лечебная прокладка",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "296": {
                    "id": 296,
                    "item_id": 3255,
                    "name": "Лечение осложненных форм кариеса. Эндодонтия",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "297": {
                    "id": 297,
                    "item_id": 12397,
                    "name": "Комплексные услуги",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "298": {
                    "id": 298,
                    "item_id": 19567,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 1,
                    "subdept": 10001720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "299": {
                    "id": 299,
                    "item_id": 3269,
                    "name": "Профилактические мероприятия",
                    "dept": 1,
                    "subdept": 10019720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "300": {
                    "id": 300,
                    "item_id": 10975,
                    "name": "Каппы - отдельные этапы",
                    "dept": 1,
                    "subdept": 10019720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "301": {
                    "id": 301,
                    "item_id": 19419,
                    "name": "Скрытые услуги (части комплексных)",
                    "dept": 1,
                    "subdept": 10019720,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "302": {
                    "id": 302,
                    "item_id": 10972,
                    "name": "Готовые наборы услуг",
                    "dept": 1,
                    "subdept": 10019703,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "303": {
                    "id": 303,
                    "item_id": 7937,
                    "name": "Лечение корневого канала с использованием дентального микроскопа",
                    "dept": 1,
                    "subdept": 10019703,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "304": {
                    "id": 304,
                    "item_id": 7940,
                    "name": "Перелечивание корневого канала с использованием дентального микроскопа",
                    "dept": 1,
                    "subdept": 10019703,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "305": {
                    "id": 305,
                    "item_id": 9953,
                    "name": "Пародонтология с применением дентального микроскопа",
                    "dept": 1,
                    "subdept": 10019703,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "306": {
                    "id": 306,
                    "item_id": 7760,
                    "name": "Удаления",
                    "dept": 1,
                    "subdept": 10001721,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "307": {
                    "id": 307,
                    "item_id": 10867,
                    "name": "Костные материалы при удалении:",
                    "dept": 1,
                    "subdept": 10001721,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "308": {
                    "id": 308,
                    "item_id": 7767,
                    "name": "Хирургические методы лечения заболеваний пародонта:",
                    "dept": 1,
                    "subdept": 10001721,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "309": {
                    "id": 309,
                    "item_id": 7776,
                    "name": "Амбулаторные операции:",
                    "dept": 1,
                    "subdept": 10001721,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "310": {
                    "id": 310,
                    "item_id": 9300,
                    "name": "Применение электрокоагулятора",
                    "dept": 1,
                    "subdept": 10001721,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "311": {
                    "id": 311,
                    "item_id": 11430,
                    "name": "Операции:",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "312": {
                    "id": 312,
                    "item_id": 7784,
                    "name": "Остеопластические материалы:",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "313": {
                    "id": 313,
                    "item_id": 19182,
                    "name": "Акции на имплантацию и протезирование на имплантатах",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "314": {
                    "id": 314,
                    "item_id": 11466,
                    "name": "Комплексные услуги (для упрощения ввода)",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "315": {
                    "id": 315,
                    "item_id": 11436,
                    "name": "All-On-4 / All-On-6: установка имплантатов",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 11466,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "316": {
                    "id": 316,
                    "item_id": 11469,
                    "name": "All-On-4 этапы",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 11466,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "317": {
                    "id": 317,
                    "item_id": 11723,
                    "name": "All-On-6 этапы",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 11466,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "318": {
                    "id": 318,
                    "item_id": 11735,
                    "name": "Диагностика перед имплантацией",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 11466,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "319": {
                    "id": 319,
                    "item_id": 19315,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "320": {
                    "id": 320,
                    "item_id": 19429,
                    "name": "Операции по установке имплатнтата",
                    "dept": 1,
                    "subdept": 10003550,
                    "group": 19315,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "321": {
                    "id": 321,
                    "item_id": 12163,
                    "name": "Общие услуги в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "322": {
                    "id": 322,
                    "item_id": 12062,
                    "name": "Диагностические исследования",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "323": {
                    "id": 323,
                    "item_id": 12164,
                    "name": "Обезболивание в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "324": {
                    "id": 324,
                    "item_id": 12166,
                    "name": "Профилактика в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "325": {
                    "id": 325,
                    "item_id": 12167,
                    "name": "Лечение в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "326": {
                    "id": 326,
                    "item_id": 12082,
                    "name": "Лечение кариеса",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12167,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "327": {
                    "id": 327,
                    "item_id": 12088,
                    "name": "Лечение пульпита (периодонтита)",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12167,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "328": {
                    "id": 328,
                    "item_id": 12106,
                    "name": "Восстановление коронковой части зубов",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12167,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "329": {
                    "id": 329,
                    "item_id": 12169,
                    "name": "Хирургическая помощь в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12167,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "330": {
                    "id": 330,
                    "item_id": 19553,
                    "name": "Лечение зубов при травме",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12167,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "331": {
                    "id": 331,
                    "item_id": 12170,
                    "name": "Лечение под наркозом и седацией в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "332": {
                    "id": 332,
                    "item_id": 19632,
                    "name": "Лечение зубов при травме под седацией/наркозом",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12170,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "333": {
                    "id": 333,
                    "item_id": 19633,
                    "name": "Хирургическая помощь в детской стоматологии под седацией/наркозом",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12170,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "334": {
                    "id": 334,
                    "item_id": 19634,
                    "name": "Лечение кариеса под седацией /наркозом",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12170,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "335": {
                    "id": 335,
                    "item_id": 19635,
                    "name": "Лечение пульпита (периодонтита) под седацией/наркозом",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12170,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "336": {
                    "id": 336,
                    "item_id": 19636,
                    "name": "Профилактика в детской стоматологии под седацией/наркозом",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12170,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "337": {
                    "id": 337,
                    "item_id": 19637,
                    "name": "Восстановление коронковой части зубов под седацией/наркозом",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12170,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "338": {
                    "id": 338,
                    "item_id": 12165,
                    "name": "Наркоз и седация в детской стоматологии",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "339": {
                    "id": 339,
                    "item_id": 19892,
                    "name": "Диагностика перед наркозом и седацией",
                    "dept": 1,
                    "subdept": 17,
                    "group": 12165,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "340": {
                    "id": 340,
                    "item_id": 19524,
                    "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                    "dept": 1,
                    "subdept": 17,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "341": {
                    "id": 341,
                    "item_id": 3773,
                    "name": "Съемные аппараты",
                    "dept": 1,
                    "subdept": 21,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "342": {
                    "id": 342,
                    "item_id": 12174,
                    "name": "Лечение с помощью кап 3D Smile",
                    "dept": 1,
                    "subdept": 21,
                    "group": 3773,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "343": {
                    "id": 343,
                    "item_id": 11388,
                    "name": "Элайнеры FlexiLigner",
                    "dept": 1,
                    "subdept": 21,
                    "group": 3773,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "344": {
                    "id": 344,
                    "item_id": 12176,
                    "name": "Капы Invisalign",
                    "dept": 1,
                    "subdept": 21,
                    "group": 3773,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "345": {
                    "id": 345,
                    "item_id": 3774,
                    "name": "Несъемная аппаратура",
                    "dept": 1,
                    "subdept": 21,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "346": {
                    "id": 346,
                    "item_id": 3775,
                    "name": "Дополнительно",
                    "dept": 1,
                    "subdept": 21,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "347": {
                    "id": 347,
                    "item_id": 5555,
                    "name": "Внеротовые аппараты",
                    "dept": 1,
                    "subdept": 21,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "348": {
                    "id": 348,
                    "item_id": 3776,
                    "name": "Ретенционные аппараты",
                    "dept": 1,
                    "subdept": 21,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "349": {
                    "id": 349,
                    "item_id": 3777,
                    "name": "Разовые манипуляции",
                    "dept": 1,
                    "subdept": 21,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "350": {
                    "id": 350,
                    "item_id": 9320,
                    "name": "ПЛАНИРОВАНИЕ:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "351": {
                    "id": 351,
                    "item_id": 3287,
                    "name": "НЕСЪЕМНАЯ ОРТОПЕДИЯ:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "352": {
                    "id": 352,
                    "item_id": 9324,
                    "name": "Временные конструкции несъемное",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3287,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "353": {
                    "id": 353,
                    "item_id": 9321,
                    "name": "Зубные металлокерамические коронки",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3287,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "354": {
                    "id": 354,
                    "item_id": 9323,
                    "name": "Зубные цельнометаллические коронки",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3287,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "355": {
                    "id": 355,
                    "item_id": 9325,
                    "name": "Безметалловые высокоэстетические конструкции",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3287,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "356": {
                    "id": 356,
                    "item_id": 9326,
                    "name": "Снятие / фиксация зубных коронок:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3287,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "357": {
                    "id": 357,
                    "item_id": 9319,
                    "name": "Корневые вкладки:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3287,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "358": {
                    "id": 358,
                    "item_id": 3323,
                    "name": "СЪЕМНАЯ ОРТОПЕДИЯ:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "359": {
                    "id": 359,
                    "item_id": 19227,
                    "name": "Временные конструкции съемные",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "360": {
                    "id": 360,
                    "item_id": 9333,
                    "name": "Акриловые/термопласт",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "361": {
                    "id": 361,
                    "item_id": 9334,
                    "name": "Ч/С протезирование",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 9333,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "362": {
                    "id": 362,
                    "item_id": 9335,
                    "name": "П/С протезирование",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 9333,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "363": {
                    "id": 363,
                    "item_id": 9336,
                    "name": "Бюгельное протезирование:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "364": {
                    "id": 364,
                    "item_id": 9350,
                    "name": "Починки",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "365": {
                    "id": 365,
                    "item_id": 9353,
                    "name": "Корекция протеза",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "366": {
                    "id": 366,
                    "item_id": 9339,
                    "name": "Зубы искусственные",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "367": {
                    "id": 367,
                    "item_id": 3352,
                    "name": "Дополнительные конструкции:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 3323,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "368": {
                    "id": 368,
                    "item_id": 7946,
                    "name": "ОРТОПЕДИЯ НА ИМПЛАНТАТАХ:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "369": {
                    "id": 369,
                    "item_id": 9329,
                    "name": "Абатменты:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 7946,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "370": {
                    "id": 370,
                    "item_id": 9330,
                    "name": "Коронки на имплантант:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 7946,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "371": {
                    "id": 371,
                    "item_id": 11428,
                    "name": "Временные конструкции:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 9330,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "372": {
                    "id": 372,
                    "item_id": 11429,
                    "name": "Коронки на имплантат (цементная фиксация):",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 9330,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "373": {
                    "id": 373,
                    "item_id": 19229,
                    "name": "Коронки на имплантат (винтовая фиксация):",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 9330,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "374": {
                    "id": 374,
                    "item_id": 11444,
                    "name": "У/С протезы на имплантаты",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 7946,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "375": {
                    "id": 375,
                    "item_id": 19225,
                    "name": "Протетика",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 7946,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "376": {
                    "id": 376,
                    "item_id": 9344,
                    "name": "КАППЫ:",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "377": {
                    "id": 377,
                    "item_id": 19208,
                    "name": "услуги",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 19204,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "378": {
                    "id": 378,
                    "item_id": 9342,
                    "name": "Определение прикуса",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "379": {
                    "id": 379,
                    "item_id": 19204,
                    "name": "Скрытые услуги (из них состоят комплексные услуги и программы)",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "380": {
                    "id": 380,
                    "item_id": 19426,
                    "name": "Ортопедия на имплантатах",
                    "dept": 1,
                    "subdept": 10001722,
                    "group": 19204,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "381": {
                    "id": 381,
                    "item_id": 3175,
                    "name": "Штатные доктора",
                    "dept": 1,
                    "subdept": 10000342,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "382": {
                    "id": 382,
                    "item_id": 12416,
                    "name": "Литье",
                    "dept": 1,
                    "subdept": 10000342,
                    "group": 3175,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "383": {
                    "id": 383,
                    "item_id": 12417,
                    "name": "Каркас",
                    "dept": 1,
                    "subdept": 10000342,
                    "group": 3175,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "384": {
                    "id": 384,
                    "item_id": 3176,
                    "name": "Внешние заказчики",
                    "dept": 1,
                    "subdept": 10000342,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "385": {
                    "id": 385,
                    "item_id": 19312,
                    "name": "НЕСЪЕМНАЯ ОРТОПЕДИЯ:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "386": {
                    "id": 386,
                    "item_id": 19296,
                    "name": "Временные конструкции несъемное",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19312,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "387": {
                    "id": 387,
                    "item_id": 19298,
                    "name": "Корневые вкладки:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19312,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "388": {
                    "id": 388,
                    "item_id": 19243,
                    "name": "Зубные цельнометаллические коронки",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19312,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "389": {
                    "id": 389,
                    "item_id": 19240,
                    "name": "Зубные металлокерамические коронки",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19312,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "390": {
                    "id": 390,
                    "item_id": 19297,
                    "name": "Безметалловые высокоэстетические конструкции",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19312,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "391": {
                    "id": 391,
                    "item_id": 19299,
                    "name": "СЪЕМНАЯ ОРТОПЕДИЯ:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "392": {
                    "id": 392,
                    "item_id": 19300,
                    "name": "Временные конструкции съемные",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19299,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "393": {
                    "id": 393,
                    "item_id": 19313,
                    "name": "Акриловые/термопласт",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19299,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "394": {
                    "id": 394,
                    "item_id": 19256,
                    "name": "Ч/С протезирование",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19313,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "395": {
                    "id": 395,
                    "item_id": 19258,
                    "name": "П/С протезирование",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19313,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "396": {
                    "id": 396,
                    "item_id": 19301,
                    "name": "Бюгельное протезирование:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19299,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "397": {
                    "id": 397,
                    "item_id": 19264,
                    "name": "Починки",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19299,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "398": {
                    "id": 398,
                    "item_id": 19302,
                    "name": "Корекция протеза",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19299,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "399": {
                    "id": 399,
                    "item_id": 19303,
                    "name": "Дополнительные конструкции:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19299,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "400": {
                    "id": 400,
                    "item_id": 19304,
                    "name": "ОРТОПЕДИЯ НА ИМПЛАНТАТАХ:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "401": {
                    "id": 401,
                    "item_id": 19305,
                    "name": "Абатменты:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19304,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "402": {
                    "id": 402,
                    "item_id": 19306,
                    "name": "Коронки на имплантант:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19304,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "403": {
                    "id": 403,
                    "item_id": 19307,
                    "name": "Временные конструкции:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19306,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "404": {
                    "id": 404,
                    "item_id": 19308,
                    "name": "Коронки на имплантат (цементная фиксация):",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19306,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "405": {
                    "id": 405,
                    "item_id": 19309,
                    "name": "Коронки на имплантат (винтовая фиксация):",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19306,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "406": {
                    "id": 406,
                    "item_id": 19310,
                    "name": "У/С протезы на имплантаты",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19304,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "407": {
                    "id": 407,
                    "item_id": 19547,
                    "name": "Дополнительные",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 19304,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "408": {
                    "id": 408,
                    "item_id": 19311,
                    "name": "КАППЫ:",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  "409": {
                    "id": 409,
                    "item_id": 19291,
                    "name": "Определение прикуса",
                    "dept": 1,
                    "subdept": 10017692,
                    "group": 0,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  }
                }
              }
            ],
            "meta": {
              "total_time": "0.1334 s",
              "query_time": "0.0030 s",
              "php_time": "0.1304 s",
              "queries": 6,
              "source": "cache",
              "memory": "2 048 KB"
            }
          });
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default getDepts;

/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const postPricelist = () => {
  // 2906/3055
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            "success": true,
            "data": {
              "0": {
                "id": 2861,
                "item_id": 19789,
                "name": "Осмотр врача-хирурга перед манипуляцией",
                "price": 1200,
                "dept": 4,
                "subdept": 10052530,
                "group": 19750,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 22,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "1": {
                "id": 2862,
                "item_id": 19756,
                "name": "Вскрытие и дренирование абсцесса мягких тканей с наложением лечебной повязки",
                "price": 3100,
                "dept": 4,
                "subdept": 10052530,
                "group": 19755,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 25,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "2": {
                "id": 2863,
                "item_id": 19757,
                "name": "Диагностическая пункция мягких тканей (без стоимости цитологического исследования)",
                "price": 1400,
                "dept": 4,
                "subdept": 10052530,
                "group": 19755,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 26,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "3": {
                "id": 2864,
                "item_id": 19758,
                "name": "Диагностическая пункция суставов",
                "price": 1900,
                "dept": 4,
                "subdept": 10052530,
                "group": 19755,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 27,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "4": {
                "id": 2865,
                "item_id": 19759,
                "name": "Забор отпечатков новообразований для цитологического исследования",
                "price": 1050,
                "dept": 4,
                "subdept": 10052530,
                "group": 19755,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 28,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "5": {
                "id": 2866,
                "item_id": 19772,
                "name": "Анестезия инфильтрационная",
                "price": 450,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 30,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "6": {
                "id": 2867,
                "item_id": 19773,
                "name": "Анестезия проводниковая",
                "price": 450,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 31,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "7": {
                "id": 2868,
                "item_id": 19761,
                "name": "Краевая резекция ногтевой пластины - радиохирургическая",
                "price": 4500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 32,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "8": {
                "id": 2869,
                "item_id": 19762,
                "name": "Краевая резекция (удаление) ногтевой пластины",
                "price": 2100,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 33,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "9": {
                "id": 2870,
                "item_id": 19813,
                "name": "Удаление ногтевой пластины без пластики ногтевого ложа с наложением лечебной повязки",
                "price": 4100,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 34,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "10": {
                "id": 2871,
                "item_id": 19814,
                "name": "Удаление ногтевой пластины с пластикой ногтевого ложа с наложением лечебной повязки",
                "price": 5000,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 35,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "11": {
                "id": 2872,
                "item_id": 19763,
                "name": "Местное обезболивание процедур (Эмла, Катеджель)",
                "price": 500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 36,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "12": {
                "id": 2873,
                "item_id": 19764,
                "name": "Наложение фиксирующей повязки",
                "price": 600,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 37,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "13": {
                "id": 2874,
                "item_id": 19765,
                "name": "Перевязка малых гнойных ран",
                "price": 1150,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 38,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "14": {
                "id": 2875,
                "item_id": 19766,
                "name": "Перевязка обширных гнойных ран",
                "price": 1750,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 39,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "15": {
                "id": 2876,
                "item_id": 19767,
                "name": "Снятие кольца с пальца (с перекусыванием кольца)",
                "price": 550,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 40,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "16": {
                "id": 2877,
                "item_id": 19768,
                "name": "Удаление подошвенной бородавки, сухой мозоли",
                "price": 2300,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 41,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "17": {
                "id": 2878,
                "item_id": 19815,
                "name": "Удаление одной или нескольких подошвенных бородавок, сухой мозоли (суммарно от 10 мм до 20 мм)",
                "price": 2800,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 42,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "18": {
                "id": 2879,
                "item_id": 19816,
                "name": "Удаление одной или нескольких подошвенных бородавок, сухой мозоли (суммарно более 20 мм)",
                "price": 3000,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 43,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "19": {
                "id": 2880,
                "item_id": 19769,
                "name": "Хирургическая обработка раны (без наложения швов)",
                "price": 1450,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 44,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "20": {
                "id": 2881,
                "item_id": 19770,
                "name": "Хирургическая обработка раны (с наложением швов)",
                "price": 2050,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 45,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "21": {
                "id": 2882,
                "item_id": 19771,
                "name": "Склеротерапия венозных звездочек с использованием до 2 мл склерозанта",
                "price": 6500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 46,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "22": {
                "id": 2883,
                "item_id": 19774,
                "name": "Снятие швов, лигатур с раны (до 4 см)",
                "price": 600,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 48,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "23": {
                "id": 2884,
                "item_id": 19799,
                "name": "Снятие швов, лигатур с раны (более 4 см)",
                "price": 700,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 50,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "24": {
                "id": 2885,
                "item_id": 19775,
                "name": "Наложение асептической повязки на рану (до 4 см)",
                "price": 400,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 51,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "25": {
                "id": 2886,
                "item_id": 19796,
                "name": "Наложение асептической повязки на рану (более 4 см)",
                "price": 700,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 52,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "26": {
                "id": 2887,
                "item_id": 19797,
                "name": "Наложение асептической повязки на рану (до 4 см) с лекарственным препаратом",
                "price": 800,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 53,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "27": {
                "id": 2888,
                "item_id": 19798,
                "name": "Наложение асептической повязки на рану (более 4 см) с лекарственным препаратом",
                "price": 1100,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 54,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "28": {
                "id": 2889,
                "item_id": 19776,
                "name": "Удаление гемангиомы (до 0.5 см)",
                "price": 500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 55,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "29": {
                "id": 2890,
                "item_id": 19777,
                "name": "Удаление липомы (до 10 см)",
                "price": 5200,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 56,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "30": {
                "id": 2891,
                "item_id": 19778,
                "name": "Удаление атеромы, фибромы (до 2 см) с последующим гистологическим исследованием (гистология оплачивается отдельно)",
                "price": 3800,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 57,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "31": {
                "id": 2892,
                "item_id": 19779,
                "name": "Удаление атеромы, фибромы более 2 см с последующим гистологическим исследованием (гистология оплачивается отдельно)",
                "price": 4700,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 58,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "32": {
                "id": 2893,
                "item_id": 19780,
                "name": "Извлечение клеща",
                "price": 600,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 59,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "33": {
                "id": 2894,
                "item_id": 19800,
                "name": "Наложение внутрикожного шва",
                "price": 1500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 60,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "34": {
                "id": 2895,
                "item_id": 19801,
                "name": "Наложение косметического шва (по Донати)",
                "price": 1600,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 61,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "35": {
                "id": 2896,
                "item_id": 19803,
                "name": "Пункция синовиальной кисты",
                "price": 1400,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 62,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "36": {
                "id": 2897,
                "item_id": 19802,
                "name": "Промывание  дренажей",
                "price": 300,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 63,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "37": {
                "id": 2898,
                "item_id": 19804,
                "name": "Локальная инъекционная терапия - околосуставное введение препарата (дипроспан)",
                "price": 2200,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 64,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "38": {
                "id": 2899,
                "item_id": 19805,
                "name": "Удаление доброкачественного образования кожи и подкожной клетчатки (атеромы, фибромы, липомы) (до 2 см)",
                "price": 3500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 65,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "39": {
                "id": 2900,
                "item_id": 19806,
                "name": "Удаление доброкачественного образования кожи и подкожной клетчатки (атеромы, фибромы, липомы) (от 2 до 4 см)",
                "price": 4700,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 66,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "40": {
                "id": 2901,
                "item_id": 19807,
                "name": "Удаление доброкачественного образования кожи и подкожной клетчатки (атеромы, фибромы, липомы) (более 4 см)",
                "price": 8600,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 67,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "41": {
                "id": 2902,
                "item_id": 19808,
                "name": "Удаление доброкачественного образования кожи и подкожной клетчатки (атеромы, фибромы, липомы) радиохирургическое (до 2 см)",
                "price": 4000,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 68,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "42": {
                "id": 2903,
                "item_id": 19809,
                "name": "Удаление доброкачественного образования кожи и подкожной клетчатки (атеромы, фибромы, липомы) радиохирургическое (от 2 до 4 см)",
                "price": 5300,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 69,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "43": {
                "id": 2904,
                "item_id": 19810,
                "name": "Удаление доброкачественного образования кожи и подкожной клетчатки (атеромы, фибромы, липомы) радиохирургическое (более 4 см)",
                "price": 9000,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 70,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "44": {
                "id": 2905,
                "item_id": 19811,
                "name": "Удаление инородного тела без рассечения мягких тканей",
                "price": 700,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 71,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "45": {
                "id": 2906,
                "item_id": 19812,
                "name": "Удаление инородного тела с рассечением мягких тканей с наложением лечебной повязки",
                "price": 2000,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 72,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "46": {
                "id": 2907,
                "item_id": 19817,
                "name": "Иссечение новообразований кожи и подкожной клетчатки лица (до 1 см)",
                "price": 5300,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 73,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "47": {
                "id": 2908,
                "item_id": 19818,
                "name": "Иссечение новообразований кожи и подкожной клетчатки лица (от 1 см до 2 см)",
                "price": 7400,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 74,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "48": {
                "id": 2909,
                "item_id": 19819,
                "name": "Иссечение новообразований кожи и подкожной клетчатки лица (от 2 см до 4 см)",
                "price": 10500,
                "dept": 4,
                "subdept": 10052530,
                "group": 19760,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 75,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "49": {
                "id": 2910,
                "item_id": 5795,
                "name": "Прием врача-эндокринолога первичный",
                "price": 1900,
                "dept": 4,
                "subdept": 10007938,
                "group": 0,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 1,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "50": {
                "id": 2911,
                "item_id": 11132,
                "name": "Прием врача-эндокринолога повторный",
                "price": 1400,
                "dept": 4,
                "subdept": 10007938,
                "group": 0,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 2,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "51": {
                "id": 2912,
                "item_id": 11087,
                "name": "Программа \"Наблюдение пациентов с сахарным диабетом на 1 год\"",
                "price": 23500,
                "dept": 4,
                "subdept": 10007938,
                "group": 11086,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 7,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "52": {
                "id": 2913,
                "item_id": 11088,
                "name": "Программа \"Скрининг сахарного диабета 2 типа\"",
                "price": 1950,
                "dept": 4,
                "subdept": 10007938,
                "group": 11086,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 8,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "53": {
                "id": 2914,
                "item_id": 11089,
                "name": "Программа \"Диагностика преддиабета и сахарного диабета\"",
                "price": 1800,
                "dept": 4,
                "subdept": 10007938,
                "group": 11086,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 9,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "54": {
                "id": 2915,
                "item_id": 11090,
                "name": "Программа \"Исключение функциональной и структурной патологии щитовидной железы\"",
                "price": 3000,
                "dept": 4,
                "subdept": 10007938,
                "group": 11086,
                "isComplexItem": 0,
                "isComplex": 0,
                "complex": "[]",
                "isVisible": 1,
                "index": 10,
                "createdon": "2024-03-09 01:30:46",
                "updatedon": null
              },
              "success": true
            },
            "meta": {
              "total_time": "28.9047 s",
              "query_time": "2.0352 s",
              "php_time": "26.8695 s",
              "queries": 5821,
              "source": "cache",
              "memory": "16 384 KB"
            }
          });
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default postPricelist;

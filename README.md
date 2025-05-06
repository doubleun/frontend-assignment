# How to run

## 1.) Web (TypeScript, NextJS)

### Option 1: Demo from this link

[Demo web](https://frontend-assignment-sand-seven.vercel.app/)

### Option 2: Development

While at the project root, run

```bash
pnpm dev:web
```

## 2.) API (TypeScript, NodeJS, gRPC)

Check unit tests by running

<img width="587" alt="Screenshot 2568-05-06 at 14 21 15" src="https://github.com/user-attachments/assets/efd82487-2013-4b01-92fb-2d3fbf35b26a" />

```bash
pnpm test
```

At the root of the project or inside `/api`

### Option 1: Run compose

While at the project root, run

```bash
docker compose up -d --build api
```

or

```bash
pnpm compose
```

The server should be up at port `50052`

### Option 2: Development

While at the project root, run

```bash
pnpm install
```

Then run

```bash
pnpm dev:api
```

The server should be up at port `50051`

### Example output from `UserService/GetAllUsersByDepartment` with `limit: 100, skip: 0`

```json
{
  "departments": {
    "Support": {
      "male": 5,
      "female": 2,
      "ageRange": "28 - 45",
      "hair": {
        "Red": 1,
        "Purple": 1,
        "Blue": 2,
        "Green": 1,
        "Blonde": 2
      },
      "addressUser": {
        "EthanMartinez": "72360",
        "MichaelWilliams": "38807",
        "DanielCook": "58781",
        "AveryCarter": "13916",
        "HunterGordon": "77521",
        "EvelynSanchez": "43423",
        "JamesDavis": "68354"
      }
    },
    "Research and Development": {
      "male": 3,
      "female": 5,
      "ageRange": "25 - 42",
      "hair": {
        "Black": 1,
        "Blue": 2,
        "White": 2,
        "Green": 1,
        "Gray": 1,
        "Blonde": 1
      },
      "addressUser": {
        "SophiaBrown": "32822",
        "NatalieHarris": "31121",
        "NicholasBailey": "58331",
        "LillianBishop": "79154",
        "StellaHughes": "24463",
        "MasonPearson": "82481",
        "LincolnKelly": "51083",
        "SofiaMitchell": "42411"
      }
    },
    "Marketing": {
      "male": 5,
      "female": 5,
      "ageRange": "27 - 34",
      "hair": {
        "Gray": 2,
        "Blue": 1,
        "Black": 1,
        "Red": 1,
        "Blonde": 1,
        "White": 4
      },
      "addressUser": {
        "IsabellaAnderson": "89352",
        "GabrielHayes": "63269",
        "RubyAndrews": "85259",
        "LunaRussell": "64610",
        "WilliamGonzalez": "78243",
        "AvaTaylor": "24771",
        "MilesStevenson": "29192",
        "GavinStanley": "85234",
        "IsaacLawrence": "62609",
        "AveryBarnes": "61359"
      }
    },
    "Engineering": {
      "male": 8,
      "female": 5,
      "ageRange": "26 - 40",
      "hair": {
        "Red": 2,
        "Brown": 2,
        "White": 2,
        "Gray": 3,
        "Green": 2,
        "Blue": 1,
        "Purple": 1
      },
      "addressUser": {
        "MasonParker": "20540",
        "LoganLawson": "10672",
        "NoahHernandez": "73696",
        "EmilyJohnson": "29112",
        "AvaHarrison": "14336",
        "HannahRobinson": "82463",
        "CalebPerkins": "12319",
        "RyanGraham": "44329",
        "JulianNewton": "33623",
        "MadisonCollins": "62091",
        "JacobCooper": "61227",
        "HarperTurner": "63361",
        "AlexanderJones": "86684"
      }
    },
    "Services": {
      "male": 3,
      "female": 4,
      "ageRange": "26 - 38",
      "hair": {
        "Blue": 1,
        "Red": 1,
        "Blonde": 1,
        "Purple": 1,
        "Black": 2,
        "Brown": 1
      },
      "addressUser": {
        "LiamGarcia": "57252",
        "HenryHill": "81783",
        "SamanthaHoward": "20118",
        "LeahHenderson": "42884",
        "AddisonWright": "54698",
        "VictoriaMcDonald": "39608",
        "DylanWells": "54522"
      }
    },
    "Training": {
      "male": 4,
      "female": 1,
      "ageRange": "30 - 33",
      "hair": {
        "Blonde": 1,
        "Brown": 1,
        "Green": 1,
        "Black": 1,
        "Blue": 1
      },
      "addressUser": {
        "LoganTorres": "78805",
        "EthanFletcher": "87924",
        "CameronBurke": "32940",
        "JonathanPierce": "34379",
        "ClaraBerry": "41818"
      }
    },
    "Human Resources": {
      "male": 4,
      "female": 5,
      "ageRange": "26 - 35",
      "hair": {
        "Red": 3,
        "Purple": 1,
        "Blonde": 1,
        "Blue": 1,
        "White": 3
      },
      "addressUser": {
        "BraydenFleming": "30822",
        "AbigailRivera": "11407",
        "OwenFisher": "54304",
        "GracePerry": "61720",
        "LucasGordon": "37169",
        "ZoeNicholson": "39449",
        "EmmaMiller": "26593",
        "EllaAdams": "85475",
        "EvanReed": "19937"
      }
    },
    "Legal": {
      "male": 6,
      "female": 7,
      "ageRange": "25 - 34",
      "hair": {
        "Green": 1,
        "White": 1,
        "Purple": 2,
        "Blue": 3,
        "Blonde": 2,
        "Red": 2,
        "Gray": 2
      },
      "addressUser": {
        "OscarPowers": "12263",
        "LilaHudson": "17472",
        "AriaRoberts": "70664",
        "PenelopeHarper": "26857",
        "JacksonEvans": "26600",
        "LaylaSullivan": "56891",
        "ElijahStewart": "31585",
        "AriaFerguson": "59501",
        "HarperKelly": "69521",
        "ChristopherWest": "63011",
        "JackWard": "42061",
        "NolanBryant": "56830",
        "ScarlettWright": "32823"
      }
    },
    "Sales": {
      "male": 2,
      "female": 3,
      "ageRange": "27 - 39",
      "hair": {
        "Gray": 1,
        "Blue": 1,
        "Blonde": 1,
        "Red": 1,
        "White": 1
      },
      "addressUser": {
        "AustinHudson": "64305",
        "ChloeMorales": "54972",
        "ScarlettBowman": "63825",
        "AubreyWagner": "72711",
        "NathanDixon": "20882"
      }
    },
    "Accounting": {
      "male": 5,
      "female": 5,
      "ageRange": "24 - 36",
      "hair": {
        "Gray": 2,
        "Purple": 2,
        "Brown": 1,
        "Black": 1,
        "Blue": 1,
        "Green": 1,
        "Blonde": 1,
        "Red": 1
      },
      "addressUser": {
        "MiaRodriguez": "41810",
        "EvelynGonzalez": "84898",
        "AveryPerez": "30973",
        "MaxRussell": "46278",
        "AaliyahHanson": "51438",
        "MateoNguyen": "20673",
        "CharlotteLopez": "42044",
        "GabrielAdams": "21191",
        "LucasGray": "12506",
        "EliBennett": "34271"
      }
    },
    "Product Management": {
      "male": 3,
      "female": 7,
      "ageRange": "22 - 34",
      "hair": {
        "Purple": 2,
        "Blue": 2,
        "Gray": 1,
        "Blonde": 2,
        "Green": 1,
        "Brown": 2
      },
      "addressUser": {
        "MadelineSimpson": "29730",
        "LilyLee": "41540",
        "EleanorTyler": "64622",
        "AutumnGomez": "53203",
        "BellaGrant": "40138",
        "AuroraLawson": "29004",
        "LeviHicks": "74747",
        "OliviaWilson": "83843",
        "BenjaminFoster": "48884",
        "CarterBaker": "74622"
      }
    },
    "Business Development": {
      "male": 0,
      "female": 3,
      "ageRange": "26 - 32",
      "hair": {
        "Blonde": 1,
        "Black": 1,
        "Red": 1
      },
      "addressUser": {
        "HazelGardner": "35181",
        "LillianSimmons": "47571",
        "NoraMills": "51983"
      }
    }
  }
}
```

### How to test gRPC API (using Yaak)

[Yaak](https://yaak.app/download)

#### 1.) Add new gRPC connection

<img width="1168" alt="Screenshot 2568-04-29 at 19 10 56" src="https://github.com/user-attachments/assets/55e25c1b-eae6-41ca-bde6-c1ef68602fd2" />

#### 2.) Enter the URL it could be `localhost:50051` or `localhost:50052` depend on how you run the api

<img width="1193" alt="Screenshot 2568-04-29 at 19 11 39" src="https://github.com/user-attachments/assets/dd9b5761-6e32-409f-951a-d974fe97447a" />

#### 3.) There will be `Select Proto File` button on the bottom if the connection is established

<img width="1191" alt="Screenshot 2568-04-29 at 19 13 21" src="https://github.com/user-attachments/assets/37b3f9e4-6e19-4f0b-a5ac-811f131b0c1b" />

#### 4.1) Click `Add File` and select the first file from `frontend-assignment/api/src/proto/user/v1/user.proto`

<img width="794" alt="Screenshot 2568-04-29 at 19 14 49" src="https://github.com/user-attachments/assets/5071d68f-25d7-4fe5-b92d-d77f204b3e96" />

#### 4.2) Click `Add File` and select the second file from `frontend-assignment/api/src/proto/department/v1/department.proto`

<img width="799" alt="Screenshot 2568-04-29 at 19 16 47" src="https://github.com/user-attachments/assets/1f299ce1-6430-4fcc-95dc-6dec706a43d4" />

#### 4.3) The `Configure Schema` dialog should now display 2 proto files selected

<img width="673" alt="Screenshot 2568-04-29 at 19 16 05" src="https://github.com/user-attachments/assets/333eb81a-f878-4a83-a02c-91e76754d595" />

#### 5.) After close the dialog you should be able to selece the schema to `UserService/GetAllUserByDepartment`

<img width="1208" alt="Screenshot 2568-04-29 at 19 17 11" src="https://github.com/user-attachments/assets/13a83b74-68b3-415c-b85f-9d00b81607c3" />

#### 6.) You can send `limit` and `skip` and see the result in the bottom right pane

<img width="1208" alt="Screenshot 2568-04-29 at 19 20 11" src="https://github.com/user-attachments/assets/9dad6d00-00b2-4e83-85f7-1094ececb337" />

# Assignment

## 1. Auto Delete Todo List

```
    [
        {
            type: 'Fruit',
            name: 'Apple',
        },
        {
            type: 'Vegetable',
            name: 'Broccoli',
        },
        {
            type: 'Vegetable',
            name: 'Mushroom',
        },
        {
            type: 'Fruit',
            name: 'Banana',
        },
        {
            type: 'Vegetable',
            name: 'Tomato',
        },
        {
            type: 'Fruit',
            name: 'Orange',
        },
        {
            type: 'Fruit',
            name: 'Mango',
        },
        {
            type: 'Fruit',
            name: 'Pineapple',
        },
        {
            type: 'Vegetable',
            name: 'Cucumber',
        },
        {
            type: 'Fruit',
            name: 'Watermelon',
        },
        {
            type: 'Vegetable',
            name: 'Carrot',
        },
    ]
```

Please make a todo list that

- Have a list of clickable buttons.
- Each button will be moved into its own column separated by type.
- Once moved, each button will have 5 seconds on the screen and then will be moved back to the bottom of the main list.
- If click on the right column (Fruit/Vegetable) the item must go back to the bottom of the left column (list) immediately.

> [!CAUTION]
> Please host the test on a hosting service and send us the link.

See example in the link below
[Video Link](https://drive.google.com/file/d/170AYx0lOXs4DLyZiPGGIgmQpFhwTKNih/view?usp=sharing)

Please do your best to show your best solution
we are looking for

1. Answer the need of question
2. Clean code easy to read

Bonus: if you have multiple solutions we could discuss those theories in our interview (no need to submit multiple versions, just send us the best one you think.)

## 2. Create data from API _(OPTIONAL)_

API from <https://dummyjson.com/users>

- Your project must use Typescript, Typescript module, and HTTP framework (GRPC is plus)
- Tranforms JSON data from API to new data groupBy department
- We encourage you to write tests, which we will give you some extra score
- We will give you an extra score if you focus on performance.

--- sample response ---

```json
    {
        [Department]: {
            "male": 1,                      // ---> Male Count Summary
            "female": 1,                    // ---> Female Count Summary
            "ageRange": "XX-XX",            // ---> Range
            "hair": {                       // ---> "Color": Color Summary
                "Black": 1,
                "Blond": 1,
                "Chestnut": 1,
                "Brown": 1
            },
            "addressUser": {                // ---> "firstNamelastName": postalCode
                "TerryMedhurst": "XXXXX",
            }
        }
    },
    ...
```

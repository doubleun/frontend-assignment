# How to run

## Web (TypeScript, NextJS)

### Option 1: Demo from this link

[Demo web](https://frontend-assignment-sand-seven.vercel.app/)

### Option 2: Development

While at the project root, run

```bash
pnpm dev:web
```

## API (TypeScript, NodeJS, gRPC)

Check unit tests by running

<img width="595" alt="Screenshot 2568-04-29 at 19 06 55" src="https://github.com/user-attachments/assets/1ff2af6c-8d65-4751-8dc8-82e19239280e" />

```bash
pnpm test
```

At the root of the project or inside `/api`

### Option 1: Run compose

While at the project root, run

```bash
docker compose up -d --build api
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

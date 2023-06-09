// export const exampleData = `{
//     "id": {
//         "_value": 123,
//         "_extra": "wowowo",
//         "_rules": [
//             "READ_ONLY",
//             "DELETE_DISABLED"
//         ]
//     },
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "isMarried": false,
//     "address": {
//         "_rules": [{
//                 "rule": "PROPERTY_COUNT_LIMIT",
//                 "params": {
//                     "limit": 5
//                 }
//             },
//             {
//                 "rule": "ALLOWED_PROPERTY_TYPES",
//                 "params": {
//                     "types": ["string", "number"]
//                 }
//             }
//         ],
//         "_value": {
//             "street": "123 Main St",
//             "city": "Anytown",
//             "state": "CA",
//             "zip": "12345"
//         }
//     },
//     "orders": [
//         5555,
//         "test strin",
//         true,
//         {
//             "id": 456,
//             "order_date": "2022-02-15T14:30:00.000Z",
//             "items": [{
//                     "id": 1,
//                     "name": "Widget",
//                     "price": 10.99,
//                     "quantity": 2
//                 },
//                 {
//                     "id": 2,
//                     "name": "Gizmo",
//                     "price": 7.99,
//                     "quantity": 1
//                 }
//             ]
//         },
//         {
//             "id": 789,
//             "order_date": "2022-02-18T10:15:00.000Z",
//             "items": [{
//                 "id": 3,
//                 "name": "Thingamajig",
//                 "price": 19.99,
//                 "quantity": 3
//             }]
//         }
//     ]
// }`

export const exampleData = `{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 15,
    "isMarried": false,
    "wowowo": true,
    "nothing": null,
    "number of childrean": -50,
    "an array": [
        "test text field",
        true,
        {
            "name": "malik",
            "age": 40,
            "is_married": false
        },
        454,
        [
            454,
            3233,
            "sasa",
            "asas",
            [
                45454,
                45,
                0,
                {
                    "name": "malik",
                    "age": 44,
                    "object": {
                        "name": "malik",
                        "age": 44
                    }
                }
            ],
            "asas"
        ],
        "asas"
    ],
    "child": {
        "name": "ahmed",
        "age": 35,
        "email": "ahmed@gmail.com",
        "wowowo": true,
        "nothing": null,
        "dog": {
            "name": "ahmed",
            "email": "ahmed@gmail.com",
            "wowowo": true
        }
    }
}`

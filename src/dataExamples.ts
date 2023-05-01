export const exampleData = `{
    "id": {
        "_type": "number",
        "_value": 123
    },
    "name": "John Doe",
    "email": "john.doe@example.com",
    "isMarried": false,
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
    },
    "orders": [
        5555,
        "test strin",
        true,
        {
            "id": 456,
            "order_date": "2022-02-15T14:30:00.000Z",
            "items": [
                {
                    "id": 1,
                    "name": "Widget",
                    "price": 10.99,
                    "quantity": 2
                },
                {
                    "id": 2,
                    "name": "Gizmo",
                    "price": 7.99,
                    "quantity": 1
                }
            ]
        },
        {
            "id": 789,
            "order_date": "2022-02-18T10:15:00.000Z",
            "items": [
                {
                    "id": 3,
                    "name": "Thingamajig",
                    "price": 19.99,
                    "quantity": 3
                }
            ]
        }
    ]
}`

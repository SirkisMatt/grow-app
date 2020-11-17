export default {
    "user": [
        {
            "id": "1",
            "username": "Nick Sea",
            "email": "Nick@gmail.com",
            "password": "password",
            "date_created": "2020-01-03T00:00:00.000Z"
        },
        {
            "id": "2",
            "username": "Malia Bobia",
            "email": "Malia@gmail.com",
            "password": "password",
            "date_created": "2020-03-01T00:00:00.000Z"
        },
        {
            "id": "3",
            "username": "Old Greg",
            "email": "Old@gmail.com",
            "password": "password",
            "date_created": "2020-04-01T00:00:00.000Z"
        },
    ],
    "goal_type": [
        {
            "id": "1",
            "title": "Exercise"
        },
        {
            "id": "2",
            "title": "Self Care"
        },
        {
            "id": "3",
            "title": "Diet"
        },
        {
            "id": "4",
            "title": "Sleep"
        }
    ],
    "goal_cards": [
        {
            "id": "1",
            "title": "Run 15 miles this week",
            "description": "try to run 3 miles 5 days out of the week",
            "date_created": "2020-11-07T00:00:00.000Z",
            "tree_bet": "5",
            "tree_org": "one-tree-planted",
            "complete_by": "2020-11-014T00:00:00.000Z",
            "completed": false,
            "goal_list": "1",
            "user_id": "16396c0f-f1dc-4988-8764-e92fe787923e",
            "goal_type_id": "1"
        },
        {
            "id": "2",
            "title": "Do some sit-ups",
            "description": "Do the situps",
            "date_created": "2020-14-07T00:00:00.000Z",
            "tree_bet": "5",
            "tree_org": "one-tree-planted",
            "complete_by": "2020-11-014T00:00:00.000Z",
            "completed": false,
            "user_id": "16396c0f-f1dc-4988-8764-e92fe787923e",
            "goal_type_id": "1"
        },
        {
            "id": "3",
            "title": "30 min of meditation",
            "description": "Just Breath",
            "date_created": "2020-14-07T00:00:00.000Z",
            "tree_bet": "5",
            "tree_org": "one-tree-planted",
            "complete_by": "2020-11-014T00:00:00.000Z",
            "completed": false,
            "goal_list": "1",
            "user_id": "16396c0f-f1dc-4988-8764-e92fe787923e",
            "goal_type_id": "2"
        },
    ],
    "goal_list": [
        {
        "user_id": "16396c0f-f1dc-4988-8764-e92fe787923e",
        "goal_type_id": "2",
        "card_ids": ['1']
        },
        {
        "user_id": "16396c0f-f1dc-4988-8764-e92fe787923e",
        "goal_type_id": "1",
        "card_ids": ['2', '3', '1', '3']
        },
        {
        "user_id": "16396c0f-f1dc-4988-8764-e92fe787923e",
        "goal_type_id": "3",
        "card_ids": ['1']
        },
        
    ]
}
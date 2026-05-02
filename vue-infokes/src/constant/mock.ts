export const mock_menu = [
  {
    id: 1,
    name: "Menu 1",
    icon: "pi pi-home",
    children: [
      {
        id: 2,
        name: "Submenu 1-1",
        icon: "pi pi-file",
        children: [
          {
            id: 4,
            name: "Submenu 1-1-1",
            icon: "pi pi-file",
          },
          {
            id: 5,
            name: "Submenu 1-1-2",
            icon: "pi pi-file",
            children: [
              {
                id: 6,
                name: "Submenu 1-1-1",
                icon: "pi pi-file",
              },
              {
                id: 7,
                name: "Submenu 1-1-2",
                icon: "pi pi-file",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Submenu 1-2",
        icon: "pi pi-file",
      },
    ],
  },
];

export const mock_menu_detail = {};

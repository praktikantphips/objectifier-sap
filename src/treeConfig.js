const treeModel = [
  {
    title: 'Item 1',
    expanded: true,
    class: 'OIDA',
    children: [
      {
        title: 'Item 1.1',
        expanded: true,
        children: [
          {
            title: 'Fuckface',
            expanded: true,
            handler (damodel) {
              console.log(damodel)
              console.log('does not work for elements with children')
            },
            children: [
              {
                title: 'Item 1.1.1.1',
                expanded: false,
                children: []
              }
            ]
          },
          {
            title: 'Item 1.1.2',
            expanded: false,
            handler: function () {
              console.log('Tapped on Item 1.1.2')
              console.log('this works cause 1.1.2 has no children')
            },
            children: []
          }
        ]
      },
      {
        title: 'Item 1.2',
        expanded: false,
        children: []
      }
    ]
  },
  {
    title: 'Item 2',
    expanded: false,
    handler: function () {
      console.log(this)
      console.log('that\'s the this var')
    },
    children: []
  }
]

export { treeModel }

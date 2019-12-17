

// ondragstart

// ondrageover

// ondrop 

export function onDragStart(event) {
    console.log('working')
    event
        .dataTransfer
        .setData('text/plain', event.target.id)

        event
            .currentTarget
            .style
            .backgroundColor = 'yellow'
}


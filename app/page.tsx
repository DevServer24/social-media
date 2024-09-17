'use client'
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { useState } from 'react'
import { motion } from 'framer-motion'

type ItemType = number

const DraggableCard = ({ item, onDragStart }: { item: ItemType, onDragStart: (item: ItemType) => void }) => (
  <motion.div
    drag
    dragElastic={0.5}
    dragMomentum={false}
    onDragStart={() => onDragStart(item)} // Start dragging and set the item
    onDragEnd={(event) => event.preventDefault()} // Prevent default behavior
    style={{ cursor: 'grab', marginBottom: '10px' }}
  >
    <Card>
      <CardHeader>
        Draggable Card {item}
      </CardHeader>
      <CardContent>
        <CardDescription>
          This is the description for item {item}.
        </CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

const App = () => {
  const [drag, setDrag] = useState<ItemType[]>([1, 2, 3, 4, 5])
  const [droppedItems, setDroppedItems] = useState<ItemType[]>([])
  const [draggingItem, setDraggingItem] = useState<ItemType | null>(null)

  const handleDragStart = (item: ItemType) => {
    setDraggingItem(item) // Set the item that is being dragged
  }

  const handleDrop = () => {
    if (draggingItem !== null) {
      // Add the dragged item to the drop zone
      setDroppedItems([...droppedItems, draggingItem])
      // Remove the item from the drag zone
      setDrag(drag.filter((i) => i !== draggingItem))
      setDraggingItem(null) // Clear the dragging item after drop
    }
  }

  return (
    <div className="p-20">
      
      <div style={{ display: 'flex', gap: '50px' }}>
        {/* Drag Zone */}
        <div style={{ flex: 1 }}>
          <h2>Drag Zone</h2>
          {drag.map((item) => (
            <DraggableCard key={item} item={item} onDragStart={handleDragStart} />
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDrop={(event) => {
            event.preventDefault() // Prevent the default drop behavior
            handleDrop() // Call the drop handler
          }}
          onDragOver={(event) => event.preventDefault()} // Allow dropping by preventing default behavior
          style={{
            flex: 1,
            padding: '20px',
            border: '2px dashed gray',
            minHeight: '300px',
          }}
        >
          <h2>Drop Zone</h2>
          {droppedItems.length === 0 ? (
            <p>Drop items here</p>
          ) : (
            droppedItems.map((item) => (
              <Card key={item} style={{ marginBottom: '10px' }}>
                <CardHeader>
                  Dropped Card {item}
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    This card has been dropped.
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App

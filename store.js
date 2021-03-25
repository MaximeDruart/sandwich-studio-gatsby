import create from "zustand"
import { devtools } from "zustand/middleware"

const store = set => ({
  canvasLoadStatus: { progress: 0 },
  setCanvasLoadStatus: ({ loaded, total }) =>
    set(() => ({ canvasLoadStatus: { progress: (loaded / total) * 100 } })),
  selectedWork: { isOpen: false, workNumber: 0 },
  setSelectedWork: obj =>
    set(state => ({ selectedWork: { ...state.selectedWork, ...obj } })),
})

const useStore = create(devtools(store))

export default useStore

import create from "zustand"

const useStore = create(set => ({
  canvasLoadStatus: { active: true, progress: 0 },
  setCanvasLoadStatus: status => set(state => ({ canvasLoadStatus: status })),
}))

export default useStore

import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  removeAllBears: () => set({ bears: 0 }),
  setMessages: (messages) => set({ messages }),
}))

export default useConversation;
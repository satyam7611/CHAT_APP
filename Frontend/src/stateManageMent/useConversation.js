import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  removeAllBears: () => set({ bears: 0 }),
  messages:[],
  setMessages: (messages) => set({ messages }),
  unreadCounts: {},
  setUnreadCounts: (counts) => set({ unreadCounts: counts }),
  incrementUnreadCount: (userId) => set((state) => ({ 
      unreadCounts: { ...state.unreadCounts, [userId]: (state.unreadCounts[userId] || 0) + 1 } 
  })),
  clearUnreadCount: (userId) => set((state) => {
      const newCounts = { ...state.unreadCounts };
      delete newCounts[userId];
      return { unreadCounts: newCounts };
  }),
  deleteMessageFromStore: (messageId) => set((state) => ({
      messages: state.messages.map((m) =>
          m._id === messageId ? { ...m, isDeleted: true, message: "This message was deleted" } : m
      )
  })),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}))

export default useConversation;
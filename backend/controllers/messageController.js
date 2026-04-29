const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { bookId, recipientId, message } = req.body;
    const senderId = req.user.userId;

    const newMessage = new Message({
      bookId,
      senderId,
      recipientId,
      message,
    });

    await newMessage.save();
    
    // Optional: Emit socket event if using socket.io here or in route
    if (req.io) {
        const room = `${bookId}-${recipientId}`;
        const senderRoom = `${bookId}-${senderId}`;
        req.io.to(room).emit('receiveMessage', newMessage);
        req.io.to(senderRoom).emit('receiveMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params; // conversationId is treated as bookId
    const userId = req.user.userId;
    const { otherUserId } = req.query;

    let query = {
        bookId: conversationId
    };

    if (otherUserId) {
        query.$or = [
            { senderId: userId, recipientId: otherUserId },
            { senderId: otherUserId, recipientId: userId }
        ];
    } else {
        // Fallback: If no otherUser specified, just get all messages for this user on this book
        // Note: For a seller, this mixes conversations. Frontend should always pass otherUserId.
        query.$or = [{ senderId: userId }, { recipientId: userId }];
    }

    const messages = await Message.find(query)
      .sort({ timestamp: 1 })
      .populate('senderId', 'username')
      .populate('recipientId', 'username');

    // Mark messages as read where recipient is current user
    if (messages.length > 0) {
        await Message.updateMany(
            { ...query, recipientId: userId, read: false },
            { $set: { read: true } }
        );
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.userId;
        const count = await Message.countDocuments({ recipientId: userId, read: false });
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getConversations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const messages = await Message.find({
            $or: [{ senderId: userId }, { recipientId: userId }]
        })
        .sort({ timestamp: -1 })
        .populate('bookId', 'title image')
        .populate('senderId', 'username')
        .populate('recipientId', 'username');

        const conversations = [];
        const seen = new Set();

        messages.forEach(msg => {
            const otherUser = msg.senderId._id.toString() === userId ? msg.recipientId : msg.senderId;
            const key = `${msg.bookId?._id}-${otherUser._id}`;
            
            if (!seen.has(key) && msg.bookId) {
                seen.add(key);
                conversations.push({
                    book: msg.bookId,
                    otherUser: otherUser,
                    lastMessage: msg.message,
                    timestamp: msg.timestamp,
                    conversationId: msg.bookId._id // Using bookId as conversation identifier context
                });
            }
        });

        res.status(200).json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

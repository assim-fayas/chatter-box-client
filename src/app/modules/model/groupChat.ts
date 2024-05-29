export interface GroupMessage {
    text: string;
    sender: string;
    timestamp:string;
    _id?:string
}

export interface GroupChatResponse {
    groupId: string;
    groupName: string;
    messages: GroupMessage[];
}
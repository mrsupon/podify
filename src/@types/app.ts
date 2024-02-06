export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    verified?: boolean;
    avatar?: IAvatar | null;
    favorites?: string[];
    followers?: string[];
    followings?: string[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
}
export interface IAvatar {
    url: string;
    publicId: string;
}

export interface IEmailVerify {
    id: string;
    token: string;
    ownerID: string;
    createdAt: string;
}

export interface IEmailReVerify {
    userID: string;
}

export interface IPasswordReset {
    id: string;
    token: string;
    ownerID: string;
    createdAt: string;
}

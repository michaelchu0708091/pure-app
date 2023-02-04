export const CONSTANT = {
    version: 'v2.3.13',
    date: '2022-10-21 10:38',
    features: [
        'last_chance_booking',
    ],
};

export const LANGUAGES = [
    { id: 1, description: 'English', name: 'en' },
    { id: 2, description: '繁體中文', name: 'zh-hk' },
    { id: 3, description: '简体中文', name: 'zh-cn' },
    // { id: 4, description: '台灣中文', name: 'zh-tw'}
];

export const BUTTON_STATUS = {
    JOIN_ZOOM: 15,
    BOOK: 1,
    BOOKED: 2,
    WAITLIST: 3,
    IN_WAITLIST: 4,
    FULL: 5,
    SIGNED_IN: 7,
    LATE_CANCEL: 8,
    ABSENT: 9,
    COMPLETE: 10,
    COMPLETED: 11,
    CANCELLED: 12,
    TRY_STAND_BY: 13,
    CLASS_ON: 14,
    LAST_CHANCE: 16,
    VIEW: 17,
    HIDDEN: 0,
};

export const REGION = {
    1: 'HK',
    2: 'SG',
    4: 'CN',
};

export const CLASS_CATEGORY = {
    PRIVATE: 'private',
    GROUP: 'group',
}
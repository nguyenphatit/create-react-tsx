/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */

'use-strict';

import constants from '../constants/globals.json';

const { prefix } = constants.localStorage;
const { separator } = constants.localStorage;

export default class LocalStorageHelper {
    /**
     * Set item local storage
     * @param name item name
     * @param value item value
     * @param group group name
     */
    public static setItem(name: string, value: string|number, group: string): void {
        let items: any = (typeof window !== 'undefined') ? localStorage.getItem(`${prefix}${separator}${group}`) : null;
        items = items ? JSON.parse(items) : {};
        items[name] = value;

        localStorage.setItem(`${prefix}${separator}${group}`, JSON.stringify(items));
    }

    /**
     * Set items local storage
     * @param items array or objects of items
     * @param group group name
     */
    public static setItems(items: object|Array<any>, group: string): void {
        localStorage.setItem(`${prefix}${separator}${group}`, JSON.stringify(items));
    }

    /**
     * Get item local storage
     * @param name item name
     * @param group group name
     */
    public static getItem(name: string, group: string): string {
        let items: any = (typeof window !== 'undefined') ? localStorage.getItem(`${prefix}${separator}${group}`) : null;
        items = items ? JSON.parse(items) : {};

        return items[name];
    }

    /**
     * Get items local storage
     * @param group
     */
    public static getItems(group: string): any {
        const items: any = (typeof window !== 'undefined') ? localStorage.getItem(`${prefix}${separator}${group}`) : null;

        return items ? JSON.parse(items) : items;
    }

    /**
     * Remove item local storage
     * @param name item name
     * @param group group name
     */
    public static removeItem(name: string, group: string): void {
        const items: any = this.getItems(`${prefix}${separator}${group}`);
        if (items && items[name]) {
            delete items[name];
            this.setItems(items, group);
        }
    }

    /**
     * Delete group
     * @param group group name
     */
    public static dispose(group: string): void {
        // eslint-disable-next-line no-unused-expressions
        (typeof window !== 'undefined') ? localStorage.removeItem(`${prefix}${separator}${group}`) : null;
    }

    /**
     * Clenup group
     * @param group group name
     */
    public static cleanup(group: string, meetingKey: string): void {
        const storedMeetingKey = this.getItem('meetingKey', group);
        if (meetingKey && storedMeetingKey) {
            if (meetingKey.split('#')[0] !== storedMeetingKey) {
              this.dispose(group);
            }
        }
    }

}

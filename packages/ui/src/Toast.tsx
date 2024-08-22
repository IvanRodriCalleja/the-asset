import { Action } from './toast/Action';
import { Card } from './toast/Card';
import { GlobalRegion, toastQueue } from './toast/GlobalRegion';
import { Region } from './toast/Region';

export { GlobalRegion } from './toast/GlobalRegion';
export const toaster = toastQueue;

export const Toast = {
	Action,
	Card,
	GlobalRegion,
	Region
};

import { VENDOR_AUTHORIZATION_STATUS } from '@common/constants';

export interface VendorAuthorizationModel {
	vemdorId: string;
	status: VENDOR_AUTHORIZATION_STATUS;
}

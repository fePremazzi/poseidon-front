export interface TransferRequest {
    id: number;
	originAccount: string;
    destinationAccount:string;
	value: number;
	scheduledDate: string;
}

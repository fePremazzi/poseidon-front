export interface TransferResponse {
    id: number;
    destinationAccount: string;
    openingDate: string;
    originAccount: string;
    scheduledDate: string;
    taxType: string;
    taxValue: number;
    value: number;
}

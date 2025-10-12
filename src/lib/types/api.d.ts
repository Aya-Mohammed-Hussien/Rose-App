// subscribe success and error response & ... 
declare type SuccessResponse<T> = {
  message: string;
} & T;

declare interface ErrorResponse {
  error: string;
}
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

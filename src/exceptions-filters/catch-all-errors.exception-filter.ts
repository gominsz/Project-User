import { ArgumentsHost, Catch} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";


@Catch()
export class CatchAllErrorsExceptionFilter extends BaseExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        //log em arquivo (Enviar o error para outra plataforma externa)
        return super.catch(exception, host);
    }
}
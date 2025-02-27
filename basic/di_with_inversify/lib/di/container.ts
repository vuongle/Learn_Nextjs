import { TYPES } from "@/lib/di/types";
import { GreetingServiceImpl } from "@/services/implementations";
import { GreetingService } from "@/services/interfaces";
import { Container } from "inversify";

const container = new Container();
container.bind<GreetingService>(TYPES.GreetingService).to(GreetingServiceImpl);
export default container;

import {
  JsonController,
  Param,
  QueryParam,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";

@JsonController()
export class UserController {
  @Get("/users")
  getUserAll() {
    return "This action returns all users";
  }

  @Get("/user")
  getUser(@QueryParam("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/user")
  createUser(user: any) {
    return "Saving user...";
  }

  @Put("/user/:id")
  updateUser(@Param("id") id: number, @Param("user") user: any) {
    return "Updating a user...";
  }

  @Delete("/user/:id")
  deleteUser(@Param("id") id: number) {
    return "Removing user...";
  }
}

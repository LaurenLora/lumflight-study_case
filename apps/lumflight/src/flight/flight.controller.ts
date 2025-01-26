import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from 'src/types/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FlightsQueryDto } from './dtos/fetch-flights.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Roles(Role.Staff, Role.Admin)
  @Get('')
  async findAllFlights(
    @Query() query: FlightsQueryDto,
    @Request() req,
  ): Promise<Flight[] | any> {
    const page = query.page || 1;
    const limit = query.limit || 5;

    if (req.user.role === Role.Staff) {
      return await this.flightService.findAllFlights(page, limit);
    } else if (req.user.role === Role.Admin) {
      return await this.flightService.findAllFlightsWithCustomers(page, limit);
    }
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOneFlights(@Param('id') id: string): Promise<Flight> {
    return await this.flightService.findOneFlights(id);
  }
}

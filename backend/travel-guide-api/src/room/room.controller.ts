import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UploadFilesDecorator } from 'src/common/decorators/upload-file.decorator';


@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UploadFilesDecorator('images', './uploads/rooms', 6)
  create(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,

  ) {
    console.log("images", images);
    return this.roomService.create(createRoomDto,images);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('city') city?: string,
    @Query('country') country?: string,
    @Query('hotel') hotel?: string,
    @Query('search') search?: string,
  ) {
    return this.roomService.findAll({
      page: +page,
      limit: +limit,
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
      city,
      country,
      hotel,
      search
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}

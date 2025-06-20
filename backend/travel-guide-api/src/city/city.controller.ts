import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { UploadFilesDecorator } from 'src/common/decorators/upload-file.decorator';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post()
  @UploadFilesDecorator('images', './uploads/city', 6)
  create(@Body() createCityDto: CreateCityDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.cityService.create(createCityDto,images);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}

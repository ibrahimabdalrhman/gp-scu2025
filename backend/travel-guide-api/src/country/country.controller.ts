import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { UploadFilesDecorator } from 'src/common/decorators/upload-file.decorator';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @Post()
  @UploadFilesDecorator('images', './uploads/country', 6)
  create(@Body() createCountryDto: CreateCountryDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.countryService.create(createCountryDto,images);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}

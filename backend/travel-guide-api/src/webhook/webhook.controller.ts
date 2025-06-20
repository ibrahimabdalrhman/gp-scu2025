import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, RawBodyRequest, Headers } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { UpdateWebhookDto } from './dto/update-webhook.dto';


@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('success')
  create(
    @Request() req: any,
    @Headers('stripe-signature') signature: string,
  ) {
    console.log("Is Buffer?", Buffer.isBuffer(req.body)); // ✅ لازم تكون true
    return this.webhookService.create(req.body, signature);
  }

  @Get()
  findAll() {
    return this.webhookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhookService.update(+id, updateWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhookService.remove(+id);
  }
}

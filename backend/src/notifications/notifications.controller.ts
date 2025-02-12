import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Sse,
  Header,
} from '@nestjs/common';
import { map } from 'rxjs';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  //  SSE - Nhận thông báo real-time
  @ApiOperation({ summary: 'Nhận thông báo real-time (SSE)' })
  @Sse('sse')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  sse() {
    return this.notificationService
      .getNotificationsStream()
      .pipe(map((notification) => ({ data: notification })));
  }

  // Lấy danh sách thông báo của user
  @ApiOperation({ summary: 'Lấy danh sách thông báo của user' })
  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: string) {
    return await this.notificationService.getUserNotifications(userId);
  }

  // Tạo thông báo mới
  @ApiOperation({ summary: 'Tạo thông báo mới' })
  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return await this.notificationService.createNotification(
      createNotificationDto.userId,
      createNotificationDto.title,
      createNotificationDto.message,
      createNotificationDto.notificationType,
    );
  }

  // Đánh dấu thông báo đã đọc
  @ApiOperation({ summary: 'Đánh dấu thông báo là đã đọc' })
  @Patch(':notificationId')
  async markNotificationAsRead(
    @Param('notificationId') notificationId: string,
  ) {
    return await this.notificationService.markAsRead(notificationId);
  }
}

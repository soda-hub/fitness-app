import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

export default function Home() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh', width: '100vw' }}>
            <Box
                component="main"
                className="MainContent"
                sx={{
                    pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100dvh',
                    gap: 1,
                    overflow: 'auto',
                }}
            >
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: { sm: -100, md: -110 },
                            zIndex: 9995,
                        }}
                    >
                        <Box sx={{ px: { xs: 2, md: 6 } }}>
                            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                                Fitness App
                            </Typography>
                        </Box>

                    </Box>
                    <Stack
                        spacing={4}
                        sx={{
                            display: 'flex',
                            maxWidth: '900px',
                            mx: 'auto',
                            px: { xs: 2, md: 6 },
                            py: { xs: 2, md: 3 },
                        }}
                    >

                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-lg">トレーニング</Typography>
                                {/* <Typography level="body-md">
                                    ボタンをクリックして、本日のトレーニングを始めましょう。
                                </Typography> */}
                            </Box>
                            <Button size="lg" sx={{ width: '200px', margin: 'auto' }} component={Link} to="/training">
                                スタート
                            </Button>
                        </Card>
                        <Card>
                            <Box sx={{ mb: 1 }}>
                                {/* <Typography level="title-lg">記録</Typography> */}
                                {/* <Typography level="body-md">
                                    ボタンをクリックして、本日のトレーニングを始めましょう。
                                </Typography> */}
                            </Box>
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                locales={[jaLocale]}
                                locale='ja'
                                headerToolbar={{
                                    left: 'title',
                                    center: '',
                                    right: 'prev today next'
                                }}
                                businessHours={{
                                    daysOfWeek: [1, 2, 3, 4, 5]
                                }}
                                eventBackgroundColor={'#FFFFFF'}
                                eventBorderColor={'#acaba9'}
                                eventTextColor={'#37362f'}

                            />

                        </Card>

                    </Stack >
                </Box >
            </Box>

        </Box>

    );
}
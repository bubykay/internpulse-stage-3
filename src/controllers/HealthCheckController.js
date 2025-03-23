
class HealthCheckController {
    gethealthInfo(req, res) {
         return res.json({
            status: 'OK',
            current_datetime: new Date().toISOString(),
        });
    }
}

export default new HealthCheckController();

/**
 * BrandBriefModel - Data Model for Brand Brief
 */

export const brandBrief = {
    target: "Phụ huynh trẻ, tầng lớp trung lưu tại thành thị (Hà Nội, TP.HCM). Sẵn sàng chi trả cho sản phẩm cao cấp, an toàn.",
    insights: [
        "Sợ sữa gây 'nóng trong', táo bón, đầy hơi cho bé.",
        "Bị ám ảnh bởi sữa giả, hàng xách tay trôi nổi.",
        "Muốn con có đề kháng tốt nhưng lại sợ sữa công thức nhiều dưỡng chất khó tiêu."
    ],
    usps: [
        {
            title: "LockNutri (Đạm Mềm)",
            desc: "Xử lý nhiệt 1 lần, bảo vệ cấu trúc protein tự nhiên. Giúp dễ tiêu hóa, không gây táo bón/nóng trong."
        },
        {
            title: "Milk Lipid Complex (MLC)",
            desc: "Phức hợp chất béo tự nhiên mô phỏng sữa mẹ. Xây dựng 3 tầng bảo vệ đường ruột, tăng cường miễn dịch."
        },
        {
            title: "TrackEasy & Foqus",
            desc: "Mã QR dưới đáy lon truy xuất nguồn gốc từ đồng cỏ Hà Lan đến ly sữa. An tâm tuyệt đối."
        },
        {
            title: "Vị thanh nhạt",
            desc: "Không đường mía (Sucrose), không hương liệu. Bảo vệ men răng và tránh béo phì ảo."
        }
    ]
};

class BrandBriefModel {
    constructor() {
        this.brief = brandBrief;
    }

    getBrief() {
        return this.brief;
    }

    getTarget() {
        return this.brief.target;
    }

    getInsights() {
        return this.brief.insights;
    }

    getUSPs() {
        return this.brief.usps;
    }
}

export default new BrandBriefModel();

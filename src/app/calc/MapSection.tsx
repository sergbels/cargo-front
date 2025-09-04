const MapSection: React.FC = () => {
    return (
        <section style={{ padding: "3rem 0" }}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div
                            style={{
                                width: "100%",
                                height: "500px",
                                backgroundColor: "var(--surface-variant)",
                                borderRadius: "var(--bradius)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "var(--onsurface-variant)",
                                boxShadow: "var(--shadow)",
                                fontSize: "var(--text-lg)",
                            }}
                        >
                            <p>Здесь будет карта маршрута</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
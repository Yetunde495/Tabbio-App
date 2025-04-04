/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Document,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import { formatMonthYear } from "../../lib/utils/formatters";

const fontSizeMap = {
  small: 10,
  medium: 12,
  large: 14,
};
const fontSizeSmMap = {
  small: 9,
  medium: 10,
  large: 11,
};

// Helper to register fonts only once
const registeredFonts = new Set();

// Pre-register common fonts with URLs
const DEFAULT_FONTS: any = {
  "Times New Roman": "https://pdf-lib.js.org/assets/fonts/liberation-serif.ttf",
  Helvetica:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
};

const EntryPDF = ({ data }: any) => {
  // Get font configuration from data
  const fontFamily = data?.style?.fontFamily || "Helvetica";
  const baseFontSrc = data?.style?.fontSrc
    ? `${window.location.origin}${data.style.fontSrc}`
    : DEFAULT_FONTS[fontFamily];

  // Define font variants based on naming convention
  const fontVariants = {
    regular: baseFontSrc,
    bold: baseFontSrc.replace(".ttf", "-bold.ttf"),
    semibold: baseFontSrc.replace(".ttf", "-semibold.ttf"),
    italic: baseFontSrc.replace(".ttf", "-italic.ttf"),
    boldItalic: baseFontSrc.replace(".ttf", "-bold-italic.ttf"),
  };

  // Register all font variants
  if (fontFamily && !registeredFonts.has(fontFamily)) {
    Font.register({
      family: fontFamily,
      fonts: [
        {
          src: fontVariants.regular,
          fontWeight: "normal",
          fontStyle: "normal",
        },
        { src: fontVariants.bold, fontWeight: "bold", fontStyle: "normal" },
        {
          src: fontVariants.semibold,
          fontWeight: "semibold",
          fontStyle: "normal",
        },
        { src: fontVariants.italic, fontWeight: "normal", fontStyle: "italic" },
        {
          src: fontVariants.boldItalic,
          fontWeight: "bold",
          fontStyle: "italic",
        },
      ],
    });
    registeredFonts.add(fontFamily);
  }

  // Register dynamic font
  if (data?.style?.fontFamily && data?.style?.fontSrc) {
    const fontKey = `${data.style.fontFamily}-${data.style.fontSrc}`;
    if (!registeredFonts.has(fontKey)) {
      Font.register({
        family: data.style.fontFamily,
        src: data.style.fontSrc,
      });
      registeredFonts.add(fontKey);
    }
  }

  // Dynamic font sizes
  const fontSize =
    fontSizeMap[data?.style?.fontSize as keyof typeof fontSizeMap] || "11px";
  const fontSizeSm =
    fontSizeSmMap[data?.style?.fontSize as keyof typeof fontSizeSmMap] || "9px";

  // Create dynamic styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 30,
      // fontFamily: data?.style?.fontFamily || "Helvetica",
      fontFamily: fontFamily,
      border: 0,
    },
    container: {
      maxWidth: 1200,
      width: "100%",
    },
    section: {
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
    },
    header: {
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      paddingBottom: 10,
      marginBottom: 20,
      alignItems: "center",
    },
    name: {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 10,
      color: data?.style?.primaryColor,
    },
    role: {
      fontSize: 14,
      fontWeight: "semibold",
      color: "#000000",
      marginBottom: 10,
    },
    text: {
      fontSize: fontSize,
      fontWeight: 500,
      color: "#000000",
      lineHeight: 1.5,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 2,
      marginBottom: 12,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 2,
      gap: 2,
      fontSize: fontSize,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 600,
      marginBottom: "12px",
      textTransform: "uppercase",
      color: data?.style?.primaryColor,
    },
    bulletList: {
      // marginLeft: 12,
    },
    bulletItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    bulletPoint: {
      width: "4.5px",
      height: "4.5px",
      borderRadius: "50%",
      marginTop: "4px",
      marginRight: "3px",
      backgroundColor: "#000",
    },
    educationItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    projectItem: {
      marginBottom: 16,
    },
    dateText: {
      fontSize: 10,
    },
    entryHeader: {
      flexDirection: "row",
      borderBottomWidth: 2,
      marginBottom: 12,
    },
    entryName: {
      fontSize: 32,
      fontWeight: "medium",
      paddingRight: 8,
    },
    entryRole: {
      fontSize: 16,
      fontWeight: "semibold",
      paddingLeft: 8,
    },
  });

  return (
    <Document style={{ border: 0 }}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={[styles.name, { color: data?.style?.primaryColor }]}>
                {data.name}
              </Text>
              {data?.config?.role && (
                <Text style={styles.role}>{data?.role}</Text>
              )}
              <View style={styles.contactInfo}>
                {["email", "phone", "location", "linkedIn", "website"]
                  .filter((field) => data?.config[field])
                  .map((field) => (
                    <View
                      key={field}
                      style={[styles.contactItem, { fontSize: fontSizeSm }]}
                    >
                      <Text style={{ fontWeight: "semibold", marginBottom: 2 }}>
                        {field.charAt(0).toUpperCase()}:{" "}
                      </Text>
                      <Text>{data[field] || "Unspecified"}</Text>
                    </View>
                  ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.text}>{data?.professionalSummary}</Text>
            </View>

            {data?.config?.areaOfExpertise && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  AREAS OF EXPERTISE
                </Text>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}
                >
                  {data?.skills?.map((item: string, index: number) => (
                    <Text style={{ fontSize: fontSizeSm }} key={index}>
                      {item} {index + 1 !== data?.skills?.length && " | "}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {data?.config.education && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  {data?.education?.map((item: any) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 4,
                            marginBottom: 8,
                          }}
                        >
                          <Text style={{ fontSize: fontSize }}>
                            {item.institution}
                          </Text>
                          {item?.location && (
                            <Text
                              style={{
                                fontStyle: "italic",
                                fontSize: fontSize,
                              }}
                            >
                              , {item?.location}
                            </Text>
                          )}
                        </View>

                        <Text
                          style={{ fontSize: fontSizeSm, color: "#71717A" }}
                        >
                          {item?.startDate && formatMonthYear(item?.startDate)}
                          {item?.hideEndDate && (
                            <span>
                              -{" "}
                              {item?.endDate
                                ? "Present"
                                : item?.endDate &&
                                  formatMonthYear(item?.endDate)}
                            </span>
                          )}
                        </Text>
                      </View>

                      <View
                        style={{
                          lineHeight: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: fontSize,
                            fontWeight: 600,
                            lineHeight: "0.8rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {item?.degree} {item?.gpa && "(" + item?.gpa + ")"}
                        </Text>
                      </View>

                      {item?.minors && (
                        <View
                          style={{
                            fontSize: fontSize,
                            marginBottom: 8,
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            gap: 2,
                          }}
                        >
                          <Text
                            style={{ fontWeight: "semibold", marginTop: 2 }}
                          >
                            Minors:
                          </Text>
                          <Text>{item?.minors}</Text>
                        </View>
                      )}
                      {item?.relevantCourseWork?.length > 0 && (
                        <View
                          style={{
                            fontSize: fontSize,
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 2,
                          }}
                        >
                          <Text
                            style={{ fontWeight: "semibold", marginTop: 2 }}
                          >
                            Relevant Coursework:{" "}{" "}
                          </Text>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                             
                              gap: 2,
                            }}
                          >
                            {item?.relevantCourseWork?.map(
                              (val: string, index: number) => (
                                <Text key={index}>
                                  {val}
                                  {item?.relevantCourseWork?.length > 1 &&
                                    index + 1 !==
                                      item?.relevantCourseWork?.length &&
                                    "," + " "}
                                </Text>
                              )
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.config?.certifications &&
              data?.certifications?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    CERTIFICATIONS & TRAININGS
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {data?.certifications?.map((item: any) => (
                      <View key={item.id} style={{ marginBottom: 8 }}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize,
                              fontWeight: "semibold",
                              color: "#3F3F46",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.name}
                          </Text>

                          <Text
                            style={{ fontSize: fontSizeSm, color: "#71717A" }}
                          >
                            {formatMonthYear(item?.date)}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: fontSize,
                              color: "#3F3F46",
                            }}
                          >
                            {item.institution}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {data?.config.projects && data?.projects?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  {data?.projects?.map((item: any) => (
                    <View key={item.id} style={{}}>
                      <Text
                        style={{
                          fontSize: fontSize,
                          fontWeight: "bold",
                          marginBottom: 8,
                        }}
                      >
                        {item?.name}
                      </Text>
                      <Text style={{ fontSize: fontSize, marginBottom: 8 }}>
                        {item?.description}
                      </Text>
                      {item?.link && (
                        <Link
                          src={item.link}
                          style={{
                            fontSize: fontSize,
                            fontWeight: "semibold",
                            color: "#2563eb",
                            textDecoration: "none",
                          }}
                        >
                          {item.link}
                        </Link>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Professional Experience */}
            {data?.config?.workExperience &&
              data?.workExperience?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    PROFESSIONAL EXPERIENCE
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {data?.workExperience?.map((item: any) => (
                      <View key={item.id} style={{ marginBottom: 8 }}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize,
                              fontWeight: "semibold",
                            }}
                          >
                            {item.company}
                          </Text>

                          <Text
                            style={{ fontSize: fontSizeSm, color: "#71717A" }}
                          >
                            {item?.startDate &&
                              formatMonthYear(item?.startDate)}
                            {item?.active
                              ? "- Present"
                              : item?.endDate &&
                                "- " + formatMonthYear(item?.endDate)}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: fontSize,
                              fontWeight: "semibold",
                              color: "#3F3F46",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <Text style={{ fontSize: fontSize, marginTop: "10px" }}>
                          {item.description}
                        </Text>
                        <View style={{ marginTop: "12px" }}>
                          {item.keyAchievements?.map(
                            (achievement: any, index: number) => (
                              <Text
                                key={index}
                                style={{
                                  fontSize: fontSize,
                                  marginBottom: "7px",
                                }}
                              >
                                • {achievement}
                              </Text>
                            )
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            {data?.config?.internships && data?.internships?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>INTERNSHIPS</Text>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.internships?.map((item: any) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text
                          style={{ fontSize: fontSize, fontWeight: "semibold" }}
                        >
                          {item.company}
                        </Text>

                        <Text
                          style={{ fontSize: fontSizeSm, color: "#71717A" }}
                        >
                          {item?.startDate && formatMonthYear(item?.startDate)}
                          {item?.active
                            ? "- Present"
                            : item?.endDate &&
                              "- " + formatMonthYear(item?.endDate)}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: fontSize,
                            fontWeight: "semibold",
                            color: "#3F3F46",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <Text style={{ fontSize: fontSize, marginTop: "10px" }}>
                        {item.description}
                      </Text>
                      <View style={{ marginTop: "12px" }}>
                        {item.keyAchievements?.map(
                          (achievement: any, index: number) => (
                            <Text
                              key={index}
                              style={{
                                fontSize: fontSize,
                                marginBottom: "7px",
                              }}
                            >
                              • {achievement}
                            </Text>
                          )
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.config?.volunteerExperience &&
              data?.volunteerExperience?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>VOLUNTEER EXPERIENCE</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {data?.volunteerExperience?.map((item: any) => (
                      <View key={item.id} style={{ marginBottom: 8 }}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize,
                              fontWeight: "semibold",
                            }}
                          >
                            {item.company}
                          </Text>

                          <Text
                            style={{ fontSize: fontSizeSm, color: "#71717A" }}
                          >
                            {item?.startDate &&
                              formatMonthYear(item?.startDate)}
                            {item?.active
                              ? "- Present"
                              : item?.endDate &&
                                "- " + formatMonthYear(item?.endDate)}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: fontSize,
                              fontWeight: "semibold",
                              color: "#3F3F46",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <Text style={{ fontSize: fontSize, marginTop: "10px" }}>
                          {item.description}
                        </Text>
                        <View style={{ marginTop: "12px" }}>
                          {item.keyAchievements?.map(
                            (achievement: any, index: number) => (
                              <Text
                                key={index}
                                style={{
                                  fontSize: fontSize,
                                  marginBottom: "7px",
                                }}
                              >
                                • {achievement}
                              </Text>
                            )
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {data?.config?.references && data?.references?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>REFEREES</Text>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.references?.map((item: any) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: fontSize,
                            fontWeight: "semibold",
                            color: "#3F3F46",
                            textTransform: "uppercase",
                          }}
                        >
                          {item?.name}
                        </Text>

                        <Text
                          style={{
                            fontSize: fontSizeSm,
                            color: "#000000d6",
                            fontStyle: "italic",
                          }}
                        >
                          {item?.relationship}
                        </Text>
                      </View>
                      <View style={{ marginBottom: 8 }}>
                        <Text
                          style={{
                            fontSize: fontSize,
                            color: "#3F3F46",
                          }}
                        >
                          {item?.title} at {item?.company}
                        </Text>
                      </View>

                      <View
                        style={{
                          fontSize: fontSize,
                          marginBottom: 8,
                          display: "flex",
                          flexDirection: "row",
                          gap: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "semibold",
                            marginTop: 2,
                            color: "#1b38dd",
                          }}
                        >
                          Contact Information:
                        </Text>

                        {item?.email && (
                          <Text
                            style={{ fontStyle: "italic", color: "#353232" }}
                          >
                            (E)- {item?.email}
                          </Text>
                        )}
                        {item?.phone && (
                          <Text
                            style={{ fontStyle: "italic", color: "#353232" }}
                          >
                            (P)- {item?.phone}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EntryPDF;

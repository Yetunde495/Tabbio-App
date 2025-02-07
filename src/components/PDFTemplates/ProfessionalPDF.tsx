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

// Font.register({
//   family: "Helvetica-Bold",
//   src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
// });
// Font.register({
//   family: "Times New Roman",
//   src: "https://fonts.gstatic.com/s/liberationserif/v13/jizDREVItHgc8qDIbSTKq4XkRiUf2zI.ttf",
// });
//
// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "white",
//     padding: 30,
//     fontFamily: "Helvetica",
//   },
//   container: {
//     maxWidth: 1200,
//     width: "100%",
//   },
//   section: {
//     marginBottom: 20,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   header: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//     paddingBottom: 10,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   name: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   role: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000000",
//     marginBottom: 8,
//   },
//   contactInfo: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: 8,
//   },
//   contactItem: {
//     flexDirection: "row",
//     ailignItems: "center",
//     paddingHorizontal: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "semibold",
//     marginBottom: 8,
//     textTransform: "uppercase",
//   },
//   bulletList: {
//     marginLeft: 12,
//   },
//   bulletItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 4,
//   },
//   bulletPoint: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginTop: 2,
//     marginRight: 4,
//   },
//   educationItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   projectItem: {
//     marginBottom: 16,
//   },
//   dateText: {
//     fontSize: 10,
//   },
//   entryHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 2,
//     marginBottom: 12,
//   },
//   entryName: {
//     fontSize: 32,
//     fontWeight: "medium",
//     paddingRight: 8,
//   },
//   entryRole: {
//     fontSize: 16,
//     fontWeight: "semibold",
//     paddingLeft: 8,
//   },
// });
//
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

const ProfessionalPDF = ({ data }: any) => {
  // const fontSize =
  //   fontSizeMap[data?.style?.fontSize as keyof typeof fontSizeMap] || "12px";
  // const fontSizeSm =
  //   fontSizeSmMap[data?.style?.fontSize as keyof typeof fontSizeMap] || "10px";
  // Handle font registration
  // const fontFamily = data?.style?.fontFamily || "Helvetica";
  // const fontSrc = data?.style?.fontSrc || DEFAULT_FONTS[fontFamily];

  // if (fontFamily && fontSrc && !registeredFonts.has(fontFamily)) {
  //   Font.register({
  //     family: fontFamily,
  //     src: fontSrc,
  //   });
  //   registeredFonts.add(fontFamily);
  //
  // }

  // Get font configuration from data
  // const fontFamily = data?.style?.fontFamily || "Helvetica";
  // const fontSrc = data?.style?.fontSrc
  //   ? `${window.location.origin}${data.style.fontSrc}` // Convert to absolute URL
  //   : DEFAULT_FONTS[fontFamily];

  // Get font configuration from data
  const fontFamily = data?.style?.fontFamily || "Helvetica";
  const baseFontSrc = data?.style?.fontSrc
    ? `${window.location.origin}${data.style.fontSrc}`
    : DEFAULT_FONTS[fontFamily];

  // const fontConfig = data?.style?.fontSrc
  //   ? {
  //       regular: `${window.location.origin}${data.style.fontSrc}`,
  //       bold: `${window.location.origin}${data.style.fontSrc.replace('.ttf', '-bold.ttf')}`,
  //       italic: `${window.location.origin}${data.style.fontSrc.replace('.ttf', '-italic.ttf')}`,
  //       boldItalic: `${window.location.origin}${data.style.fontSrc.replace('.ttf', '-bold-italic.ttf')}`
  //     }
  //   : DEFAULT_FONTS[fontFamily];

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

  // if (fontFamily && !registeredFonts.has(fontFamily)) {
  //   Font.register({
  //     family: fontFamily,
  //     fonts: [
  //       { src: fontConfig.regular, fontWeight: 'normal', fontStyle: 'normal' },
  //       { src: fontConfig.bold, fontWeight: 'bold', fontStyle: 'normal' },
  //       { src: fontConfig.italic, fontWeight: 'normal', fontStyle: 'italic' },
  //       { src: fontConfig.boldItalic, fontWeight: 'bold', fontStyle: 'italic' },
  //     ],
  //   });
  //   registeredFonts.add(fontFamily);
  // }

  // // Register font only once
  // if (fontFamily && fontSrc && !registeredFonts.has(fontFamily)) {
  //   Font.register({
  //     family: fontFamily,
  //     src: fontSrc,
  //   });
  //   registeredFonts.add(fontFamily);
  // }

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
    fontSizeMap[data?.style?.fontSize as keyof typeof fontSizeMap] || 12;
  const fontSizeSm =
    fontSizeSmMap[data?.style?.fontSize as keyof typeof fontSizeSmMap] || 10;

  // Create dynamic styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 30,
      // fontFamily: data?.style?.fontFamily || "Helvetica",
      fontFamily: fontFamily,
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
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 4,
      color: data?.style?.primaryColor,
    },
    role: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 8,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "semibold",
      marginBottom: 8,
      textTransform: "uppercase",
      color: data?.style?.primaryColor,
    },
    bulletList: {
      marginLeft: 12,
    },
    bulletItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    bulletPoint: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginTop: 2,
      marginRight: 4,
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
    <Document>
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
                {["email", "phone", "location", "linkedin", "website"]
                  .filter((field) => data?.config[field])
                  .map((field) => (
                    <View
                      key={field}
                      style={[styles.contactItem, { fontSize: fontSizeSm }]}
                    >
                      <Text style={{ fontWeight: "semibold" }}>
                        {field.charAt(0).toUpperCase()}:{" "}
                      </Text>
                      <Text>{data[field] || "Unspecified"}</Text>
                    </View>
                  ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: data?.style?.primaryColor },
                ]}
              >
                PROFESSIONAL SUMMARY
              </Text>
              <Text style={{ fontSize }}>{data?.professionalSummary}</Text>
            </View>

            {data?.config?.areasOfExpertise && (
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
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                >
                  {data?.areasOfExpertise?.map((item, index) => (
                    <Text style={{ fontSize: fontSizeSm }} key={index}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {data?.config?.education && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  EDUCATION
                </Text>
                {data?.education?.map((item) => (
                  <View key={item?._id} style={styles.educationItem}>
                    <View>
                      <View style={styles.bulletItem}>
                        <View
                          style={[
                            styles.bulletPoint,
                            { backgroundColor: data?.style?.primaryColor },
                          ]}
                        />
                        <Text style={{ fontSize }}>{item?.institution}</Text>
                      </View>
                      <View style={{ marginLeft: 16 }}>
                        <Text
                          style={[
                            { color: "#393942" },
                            { fontSize: fontSizeSm },
                          ]}
                        >
                          {item?.degree}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.dateText, { fontSize: fontSizeSm }]}>
                      {formatMonthYear(item?.startDate)} -{" "}
                      {item?.active
                        ? "Present"
                        : formatMonthYear(item?.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {data?.config?.certifications && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  CERTIFICATIONS
                </Text>
                {data?.certifications?.map((item) => (
                  <View key={item?._id} style={styles.educationItem}>
                    <View>
                      <View style={styles.bulletItem}>
                        <View
                          style={[
                            styles.bulletPoint,
                            { backgroundColor: data?.style?.primaryColor },
                          ]}
                        />
                        <Text style={{ fontSize }}>{item?.institution}</Text>
                      </View>
                      <View style={{ marginLeft: 16 }}>
                        <Text
                          style={[
                            { color: "#393942" },
                            { fontSize: fontSizeSm },
                          ]}
                        >
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.dateText, { fontSize: fontSizeSm }]}>
                      {formatMonthYear(item?.date)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Relevant Courses */}
            {data?.config?.relevantCourses && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  RELEVANT COURSES
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {data?.relevantCourses?.map((item, index) => (
                    <Text
                      style={{ fontSize: fontSize, color: "#393942" }}
                      key={index}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Projects */}
            {data?.config?.projects && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  PROJECTS
                </Text>
                {data?.projects?.map((item) => (
                  <View key={item?._id} style={{ marginBottom: 16 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={[
                          {
                            fontWeight: "semibold",
                            color: "#000000",
                            padding: "0 8px",
                            marginBottom: 8,
                          },
                          { fontSize: fontSize },
                        ]}
                      >
                        {item?.name}
                      </Text>
                      <Text
                        style={[
                          {
                            fontWeight: "semibold",
                            color: "#000000",
                            padding: "0 8px",
                          },
                          { fontSize: fontSizeSm },
                        ]}
                      >
                        {item?.technology}
                      </Text>
                    </View>
                    <Text
                      style={[
                        {
                          fontWeight: "semibold",
                          padding: "0 6px",
                          marginVertical: 4,
                        },
                        { fontSize: fontSizeSm },
                      ]}
                      // style={{ marginVertical: 4 }}
                    >
                      {item?.description}
                    </Text>
                    {item?.link && (
                      <Link
                        src={item?.link}
                        style={[{ color: "blue" }, { fontSize }]}
                      >
                        {item?.link}
                      </Link>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Work Experience */}
            {data?.config?.workExperience && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  PROFESSIONAL EXPERIENCE
                </Text>
                {data?.workExperience?.map((item) => (
                  <View key={item?._id} style={{ marginBottom: 16 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={[{ fontWeight: "semibold" }, { fontSize }]}>
                        {item?.company}
                      </Text>
                      <Text style={[styles.dateText, { fontSize: fontSizeSm }]}>
                        {formatMonthYear(item?.startDate)} -{" "}
                        {item?.active
                          ? "Present"
                          : formatMonthYear(item?.endDate)}
                      </Text>
                    </View>
                    <Text
                      style={[{ marginVertical: 4 }, { fontSize: fontSize }]}
                    >
                      {item?.title}
                    </Text>
                    <View style={styles.bulletList}>
                      {item?.keyAchievements?.map((achievement, index) => (
                        <View key={index} style={styles.bulletItem}>
                          <View
                            style={[
                              styles.bulletPoint,
                              { backgroundColor: data?.style?.primaryColor },
                            ]}
                          />
                          <Text style={{ fontSize: fontSizeSm }}>
                            {achievement}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Internships */}
            {data?.config?.internships && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  INTERNSHIPS
                </Text>
                {data?.internships?.map((item) => (
                  <View key={item?._id} style={{ marginBottom: 16 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontWeight: "semibold", fontSize: fontSizeSm }}
                      >
                        {item?.company}
                      </Text>
                      <Text style={styles.dateText}>
                        {formatMonthYear(item?.startDate)} -{" "}
                        {item?.active
                          ? "Present"
                          : formatMonthYear(item?.endDate)}
                      </Text>
                    </View>
                    <Text style={{ marginVertical: 4, fontSize }}>
                      {item?.title}
                    </Text>
                    <View style={styles.bulletList}>
                      {item?.keyAchievements?.map((achievement, index) => (
                        <View key={index} style={styles.bulletItem}>
                          <View
                            style={[
                              styles.bulletPoint,
                              { backgroundColor: data?.style?.primaryColor },
                            ]}
                          />
                          <Text style={{ fontSize: fontSizeSm }}>
                            {achievement}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Experience */}
            {data?.volunteerExperience?.length > 0 && (
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: data?.style?.primaryColor },
                  ]}
                >
                  VOLUNTEER EXPERIENCE
                </Text>
                {data?.volunteerExperience?.map((item) => (
                  <View key={item?._id} style={{ marginBottom: 16 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontWeight: "semibold", fontSize: fontSizeSm }}
                      >
                        {item?.company}
                      </Text>
                      <Text style={styles.dateText}>
                        {formatMonthYear(item?.startDate)} -{" "}
                        {item?.active
                          ? "Present"
                          : formatMonthYear(item?.endDate)}
                      </Text>
                    </View>
                    <Text style={{ marginVertical: 4, fontSize }}>
                      {item?.title}
                    </Text>
                    <View style={styles.bulletList}>
                      {item?.keyAchievements?.map((achievement, index) => (
                        <View key={index} style={styles.bulletItem}>
                          <View
                            style={[
                              styles.bulletPoint,
                              { backgroundColor: data?.style?.primaryColor },
                            ]}
                          />
                          <Text style={{ fontSize: fontSizeSm }}>
                            {achievement}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalPDF;

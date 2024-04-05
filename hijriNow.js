'use strict';

const HijriNow = {
  currentLanguage: 'ar', // Default language set to Arabic
  today: function today() {
    const today = new Date();
    return this.gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());
  },
  toGregorian: function toGregorian(dateString, splitter) {
    if (!splitter) splitter = "/";
    const [day, month, year] = dateString.split(splitter);
    return this.hijriToGregorian(year, month, day);
  },
  toHijri: function toHijri(dateString, splitter) {
    if (!splitter) splitter = "/";
    const [day, month, year] = dateString.split(splitter);
    return this.gregorianToHijri(year, month, day);
  },
  hijriToGregorian: function hijriToGregorian(year, month, day) {
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return "Error Input";

    const ii = year - 1;
    const iln = ii * 12 + month;
    const mcjdn = day + this.ummalqura_dat[iln - 1] - 1;
    const cjdn = mcjdn + 2400000;
    return this.julianToGregorian(cjdn);
  },
  gregorianToHijri: function gregorianToHijri(pYear, pMonth, pDay) {
    let year = parseInt(pYear);
    let month = parseInt(pMonth);
    const day = parseInt(pDay);

    if (month < 3) {
        year -= 1;
        month += 12;
    }

    const a = Math.floor(year / 100);
    const jgc = a - Math.floor(a / 4) - 2;
    const cjdn = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day - jgc - 1524;

    // Calculate the Hijri year based on the calculated cjdn
    const yearDiff = Math.floor((cjdn - 1948083) / 354.367);
    const hijriYear = yearDiff; // Subtracting 1 from the Hijri year

    // Calculate the Hijri month and day
    const remainder = (cjdn - 1948083) % 354.367;
    const hijriMonth = Math.floor(remainder / 29.5305) + 1;
    const hijriDay = Math.ceil(remainder % 29.5305) - 1; // Subtract 1 from the Hijri day

    return `${hijriDay}/${hijriMonth}/${hijriYear}`;
},

  hijriDateFromCJDN: function hijriDateFromCJDN(cjdn) {
    const mcjdn = cjdn - 2400000;
    let i = 0;
    for (; i < this.ummalqura_dat.length; i++) {
      if (this.ummalqura_dat[i] > mcjdn) break;
    }
    const iln = i + 16260;
    const ii = Math.floor((iln - 1) / 12);
    const iy = ii + 1;
    const im = iln - 12 * ii;
    const id = mcjdn - this.ummalqura_dat[i - 1] + 1;
    return `${id}/${im}/${iy}`;
  },
  julianToGregorian: function julianToGregorian(julianDate) {
    const z = Math.floor(julianDate + 0.5);
    let a = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = b - d - Math.floor(e * 30.6001);
    const month = e - (e > 13.5 ? 13 : 1);
    const year = c - (month > 2.5 ? 4716 : 4715);
    return `${day}/${month}/${year}`;
  },
   ummalqura_dat: [
    28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990, 29019, 29049, 29078, 29108, 29137, 29167,
    29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522, 29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759,
    29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053, 30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348,
    30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585, 30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939,
    30968, 30998, 31027, 31057, 31086, 31116, 31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530,
    31559, 31589, 31618, 31648, 31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120,
    32150, 32180, 32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711,
    32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243, 33272, 33302,
    33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775, 33804, 33834, 33863, 33893,
    33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306, 34336, 34365, 34395, 34424, 34454, 34483,
    34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837, 34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074,
    35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370, 35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665,
    35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901, 35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254,
    36284, 36314, 36343, 36373, 36403, 36433, 36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845,
    36875, 36904, 36934, 36963, 36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436,
    37465, 37495, 37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027,
    38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558, 38587, 38617,
    38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089, 39118, 39148, 39178, 39208,
    39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621, 39650, 39680, 39709, 39739, 39768, 39798,
    39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153, 40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389,
    40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980,
    41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216, 41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570,
    41599, 41629, 41658, 41688, 41718, 41748, 41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161,
    42190, 42220, 42249, 42279, 42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751,
    42780, 42810, 42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342,
    43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873, 43903, 43932,
    43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405, 44434, 44464, 44493, 44523,
    44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936, 44966, 44996, 45025, 45055, 45084, 45114,
    45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468, 45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704,
    45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999, 46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295,
    46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531, 46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885,
    46915, 46944, 46974, 47003, 47033, 47063, 47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476,
    47506, 47535, 47565, 47594, 47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066,
    48096, 48125, 48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657,
    48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189, 49218, 49248,
    49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720, 49749, 49779, 49809, 49838,
    49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252, 50281, 50311, 50340, 50370, 50400, 50429,
    50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784, 50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019,
    51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315, 51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611,
    51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846, 51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200,
    52230, 52260, 52290, 52319, 52349, 52379, 52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792,
    52822, 52851, 52881, 52910, 52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383,
    53412, 53441, 53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53913, 53943, 53973,
    54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505, 54535, 54564,
    54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036, 55066, 55095, 55125, 55154,
    55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567, 55597, 55627, 55657, 55686, 55716, 55745,
    55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100, 56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335,
    56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631, 56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926,
    56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162, 57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517,
    57546, 57576, 57605, 57634, 57664, 57694, 57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57960, 57989, 58019, 58048, 58077, 58107,
    58137, 58167, 58196, 58226, 58255, 58285, 58314, 58344, 58373, 58403, 58432, 58462, 58491, 58521, 58550, 58580, 58609, 58639, 58669, 58698,
    58728, 58758, 58787, 58817, 58846, 58876, 58905, 58935, 58964, 58994, 59023, 59053, 59082, 59112, 59141, 59171, 59200, 59230, 59260, 59290,
    59319, 59349, 59378, 59407, 59437, 59466, 59496, 59525, 59555, 59584, 59614, 59643, 59673, 59702, 59732, 59762, 59791, 59821, 59851, 59880,
    59910, 59939, 59968, 59998, 60027, 60056, 60086, 60115, 60145, 60175, 60205, 60234, 60264, 60293, 60323, 60352, 60382, 60411, 60441, 60470,
    60499, 60529, 60559, 60588, 60618, 60648, 60677, 60707, 60736, 60766, 60795, 60825, 60854, 60883, 60913, 60942, 60972, 61002, 61032, 61061,
    61091, 61121, 61150, 61180, 61209, 61239, 61268, 61298, 61327, 61356, 61386, 61415, 61445, 61475, 61504, 61534, 61563, 61593, 61622, 61652,
    61681, 61711, 61740, 61770, 61799, 61829, 61858, 61888, 61918, 61947, 61977, 62007, 62036, 62066, 62095, 62125, 62154, 62184, 62213, 62243,
    62272, 62302, 62331, 62361, 62390, 62420, 62450, 62479, 62509, 62538, 62568, 62597, 62627, 62656, 62686, 62715, 62745, 62775, 62804, 62834,
    62864, 62893, 62923, 62952, 62981, 63011, 63040, 63070, 63099, 63129, 63158, 63188, 63217, 63247, 63277, 63306, 63336, 63365, 63395, 63425,
    63454, 63484, 63513, 63543, 63572, 63602, 63631, 63660, 63690, 63719, 63749, 63778, 63808, 63838, 63867, 63897, 63927, 63956, 63986, 64015,
    64045, 64074, 64104, 64133, 64163, 64192, 64222, 64251, 64281, 64310, 64340, 64370, 64399, 64429, 64458, 64488, 64517, 64547, 64576, 64606,
    64635, 64665, 64695, 64724, 64754, 64784, 64813, 64843, 64872, 64902, 64931, 64960, 64990, 65019, 65049, 65078, 65108, 65138, 65167, 65197,
    65227, 65256, 65286, 65315, 65345, 65374, 65403, 65433, 65462, 65492, 65521, 65551, 65580, 65610, 65640, 65670, 65699, 65729, 65758, 65788,
    65817, 65847, 65876, 65906, 65935, 65965, 65994, 66024, 66053, 66083, 66112, 66142, 66172, 66201, 66231, 66260, 66290, 66319, 66349, 66378,
    66408, 66437, 66467, 66496, 66526, 66556, 66585, 66615, 66644, 66674, 66703, 66733, 66762, 66792, 66821, 66851, 66880, 66910, 66939, 66969,
    66999, 67028, 67058, 67087, 67117, 67146, 67176, 67205, 67235, 67264, 67294, 67323, 67353, 67382, 67412, 67441, 67471, 67501, 67530, 67560,
    67590, 67619, 67649, 67678, 67708, 67737, 67766, 67796, 67825, 67855, 67884, 67914, 67944, 67973, 68003, 68033, 68062, 68092, 68121, 68151,
    68180, 68210, 68239, 68269, 68298, 68328, 68357, 68387, 68416, 68446, 68475, 68505, 68534, 68564, 68594, 68624, 68653, 68683, 68712, 68741,
    68771, 68800, 68830, 68859, 68889, 68919, 68948, 68978, 69008, 69037, 69067, 69096, 69126, 69155, 69185, 69214, 69244, 69273, 69303, 69332,
    69362, 69391, 69421, 69451, 69481, 69510, 69540, 69569, 69599, 69628, 69657, 69687, 69716, 69746, 69775, 69805, 69835, 69864, 69894, 69923,
    69953, 69983, 70012, 70042, 70071, 70101, 70130, 70160, 70189, 70219, 70248, 70278, 70307, 70337, 70366, 70396, 70426, 70456, 70485, 70515,
    70544, 70574, 70603, 70633, 70662, 70692, 70721, 70751, 70780, 70810, 70839, 70869, 70899, 70928, 70958, 70987, 71017, 71046, 71076, 71105,
    71135, 71164, 71193, 71223, 71252, 71282, 71312, 71341, 71371, 71400, 71430, 71460, 71489, 71519, 71548, 71578, 71607, 71637, 71666, 71696,
    71725, 71755, 71784, 71814, 71844, 71873, 71903, 71932, 71962, 71991, 72021, 72050, 72080, 72109, 72139, 72168, 72198, 72228, 72258, 72287,
    72317, 72346, 72375, 72405, 72434, 72464, 72493, 72523, 72553, 72582, 72612, 72641, 72671, 72700, 72730, 72759, 72789, 72818, 72848, 72877,
    72907, 72937, 72966, 72996, 73026, 73055, 73085, 73114, 73144, 73173, 73203, 73232, 73262, 73291, 73321, 73350, 73380, 73409, 73439, 73468,
    73498, 73528, 73557, 73587, 73617, 73646, 73676, 73705, 73735, 73764, 73794, 73823, 73853, 73882, 73912, 73941, 73971, 74000, 74030, 74059,
    74089, 74118, 74148, 74178, 74207, 74237, 74266, 74296, 74325, 74355, 74384, 74414, 74443, 74473, 74502, 74532, 74561, 74591, 74621, 74650,
    74680, 74709, 74739, 74768, 74798, 74827, 74857, 74886, 74916, 74945, 74975, 75004, 75034, 75063, 75093, 75123, 75153, 75182, 75212, 75241,
    75271, 75300, 75330, 75359, 75389, 75418, 75448, 75477, 75507, 75536, 75566, 75595, 75625, 75654, 75684, 75714, 75743, 75773, 75802, 75832,
    75861, 75891, 75920, 75950, 75979, 76009, 76038, 76068, 76097, 76127, 76157, 76186, 76216, 76245, 76275, 76304, 76334, 76363, 76393, 76422,
    76452, 76481, 76511, 76540, 76570, 76599, 76629, 76658, 76688, 76718, 76747, 76777, 76806, 76836, 76865, 76895, 76924, 76954, 76983, 77013,
    77042, 77072, 77101, 77131, 77161, 77190, 77220, 77249, 77279, 77308, 77338, 77367, 77397, 77426, 77456, 77485, 77515, 77544, 77574, 77603,
    77633, 77663, 77692, 77722, 77751, 77781, 77810, 77840, 77869, 77899, 77928, 77958, 77987, 78017, 78046, 78076, 78105, 78135, 78164, 78194,
    78224, 78253, 78283, 78312, 78342, 78371, 78401, 78430, 78460, 78489, 78519, 78548, 78578, 78607, 78637, 78666, 78696, 78726, 78755, 78785,
    78814, 78844, 78873, 78903, 78932, 78962, 78991, 79021, 79050, 79080, 79109, 79139, 79168, 79198, 79227, 79257, 79287, 79316, 79346, 79375,
    79405, 79434, 79464, 79493, 79523, 79552, 79582, 79611, 79641, 79670, 79700, 79729, 79759, 79788, 79818, 79847, 79877, 79906, 79936, 79966,
    79995, 80025, 80054, 80084, 80113, 80143, 80172, 80202, 80231, 80261, 80290, 80320, 80349, 80379, 80408, 80438, 80467, 80497, 80526, 80556,
    80585, 80615, 80645, 80674, 80704, 80733, 80763, 80792, 80822, 80851, 80881, 80910, 80940, 80969, 80999, 81028, 81058, 81087, 81117, 81146,
    81176, 81205, 81235, 81264, 81294, 81324, 81353, 81383, 81412, 81442, 81471, 81501, 81530, 81560, 81589, 81619, 81648, 81678, 81707, 81737,
    81766, 81796, 81825, 81855, 81885, 81914, 81944, 81973, 82003, 82032, 82062, 82091, 82121, 82150, 82180, 82209, 82239, 82268, 82298, 82327,
    82357, 82386, 82416, 82445, 82475, 82505, 82534, 82564, 82593, 82623, 82652, 82682, 82711, 82741, 82770, 82800, 82829, 82859, 82888, 82918,
    82947, 82977, 83006, 83036, 83065, 83095, 83124, 83154, 83183, 83213, 83243, 83272, 83302, 83331, 83361, 83390, 83420, 83449, 83479, 83508,
    83538, 83567, 83597, 83626, 83656, 83685, 83715, 83744, 83774, 83804, 83833, 83863, 83892, 83922, 83951, 83981, 84010, 84040, 84069, 84099,
    84128, 84158, 84187, 84217, 84246, 84276, 84305, 84335, 84365, 84394, 84424, 84453, 84483, 84512, 84542, 84571, 84601, 84630, 84660, 84689,
    84719, 84748, 84778, 84807, 84837, 84866, 84896, 84925, 84955, 84984, 85014, 85043, 85073, 85102, 85132, 85162, 85191, 85221, 85250, 85280,
    85309, 85339, 85368, 85398, 85427, 85457, 85486, 85516, 85545, 85575, 85604, 85634, 85663, 85693, 85722, 85752, 85782, 85811, 85841, 85870,
    85900, 85929, 85959, 85988, 86018, 86047, 86077, 86106, 86136, 86165, 86195, 86224, 86254, 86283, 86313, 86342, 86372, 86401, 86431, 86461,
    86490, 86520, 86549, 86579, 86608, 86638, 86667, 86697, 86726, 86756, 86785, 86815, 86844, 86874, 86903, 86933, 86962, 86992, 87021, 87051,
    87081, 87110, 87140, 87169, 87199, 87228, 87258, 87287, 87317, 87346, 87376, 87405, 87435, 87464, 87494, 87523, 87553, 87582, 87612, 87641,
    87671, 87701, 87730, 87760, 87789, 87819, 87848, 87878, 87907, 87937, 87966, 87996, 88025, 88055, 88084, 88114, 88143, 88173, 88202, 88232,
    88262, 88291, 88321, 88350, 88380, 88409, 88439, 88468, 88498, 88527, 88557, 88586, 88616, 88645, 88675, 88704, 88734, 88763, 88793, 88822,
    88852, 88881, 88911, 88940, 88970, 88999, 89029, 89058, 89088, 89117, 89147, 89176, 89206, 89236, 89265, 89295, 89324, 89354, 89383, 89413,
    89442, 89472, 89501, 89531, 89560, 89590, 89619, 89649, 89678, 89708, 89737, 89767, 89796, 89826, 89855, 89885, 89914, 89944, 89974, 90003,
    90033, 90062, 90092, 90121, 90151, 90180, 90210, 90239, 90269, 90298, 90328, 90357, 90387, 90416, 90446, 90475, 90505, 90534, 90564, 90593,
    90623, 90653, 90682, 90712, 90741, 90771, 90800, 90830, 90859, 90889, 90918, 90948, 90977, 91007, 91036, 91066, 91095, 91125, 91154, 91184,
    91213, 91243, 91272, 91302, 91331, 91361, 91390, 91420, 91449, 91479, 91508, 91538, 91568, 91597, 91627, 91656, 91686, 91715, 91745, 91774,
    91804, 91833, 91863, 91892, 91922, 91951, 91981, 92010, 92040, 92069, 92099, 92128, 92158, 92187, 92217, 92246, 92276, 92305, 92335, 92364,
    92394, 92424, 92453, 92483, 92512, 92542, 92571, 92601, 92630, 92660, 92689, 92719, 92748, 92778, 92807, 92837, 92866, 92896, 92925, 92955,
    92984, 93014, 93043, 93073, 93102, 93132, 93161, 93191, 93220, 93250, 93279, 93309, 93338, 93368, 93397, 93427, 93457, 93486, 93516, 93545,
    93575, 93604, 93634, 93663, 93693, 93722, 93752, 93781, 93811, 93840, 93870, 93899, 93929, 93958, 93988, 94017, 94047, 94076, 94106, 94135,
    94165, 94194, 94224, 94253, 94283, 94312, 94342, 94371, 94401, 94430, 94460, 94489, 94519, 94548, 94578, 94607, 94637, 94666, 94696, 94726,
    94755, 94785, 94814, 94844, 94873, 94903, 94932, 94962, 94991, 95021, 95050, 95080, 95109, 95139, 95168, 95198, 95227, 95257, 95286, 95316,
    95345, 95375, 95404, 95434, 95463, 95493, 95522, 95552, 95581, 95611, 95641, 95670, 95700, 95729, 95759, 95788, 95818, 95847, 95877, 95906,
    95936, 95965, 95995, 96024, 96054, 96083, 96113, 96142, 96172, 96201, 96231, 96260, 96290, 96319, 96349, 96378, 96408, 96437, 96467, 96496,
    96526, 96555, 96585, 96614, 96644, 96673, 96703, 96732, 96762, 96791, 96821, 96850, 96880, 96910, 96939, 96969, 96998, 97028, 97057, 97087,
    97116, 97146, 97175, 97205, 97234, 97264, 97293, 97323, 97352, 97382, 97411, 97441, 97470, 97500, 97529, 97559, 97588, 97618, 97647, 97677,
    97706, 97736, 97765, 97795, 97824, 97854, 97883, 97913, 97942, 97972, 98002, 98031, 98061, 98090, 98120, 98149, 98179, 98208, 98238, 98267,
    98297, 98326, 98356, 98385, 98415, 98444, 98474, 98503, 98533, 98562, 98592, 98621, 98651, 98680, 98710, 98739, 98769, 98798, 98828, 98857,
    98887, 98917, 98946, 98976, 99005, 99035, 99064, 99094, 99123, 99153, 99182, 99212, 99241, 99271, 99300, 99330, 99359, 99389, 99418, 99448,
    99477, 99507, 99536, 99566, 99595, 99625, 99654, 99684, 99713, 99743, 99773, 99802, 99832, 99861, 99891, 99920, 99950, 99979, 100009, 100038,
    100068, 100097, 100127, 100156, 100186, 100215, 100245, 100274, 100304, 100333, 100363, 100392, 100422, 100451, 100481, 100510, 100540,
    100569, 100599, 100628, 100658, 100688, 100717, 100747, 100776, 100806, 100835, 100865, 100894, 100924, 100953, 100983, 101012, 101042,
    101071, 101101, 101130, 101160, 101189, 101219, 101248, 101278, 101307, 101337, 101366, 101396, 101425, 101455, 101484, 101514, 101543,
    101573, 101602, 101632, 101661, 101691, 101720, 101750, 101779, 101809, 101838, 101868, 101897, 101927, 101956, 101986, 102015, 102045,
    102074, 102104, 102134, 102163, 102193, 102222, 102252, 102281, 102311, 102340, 102370, 102399, 102429, 102458, 102488, 102517, 102547,
    102576, 102606, 102635, 102665, 102694, 102724, 102753, 102783, 102812, 102842, 102871, 102901, 102930, 102960, 102989, 103019, 103048,
    103078, 103107]  
};

module.exports = HijriNow;